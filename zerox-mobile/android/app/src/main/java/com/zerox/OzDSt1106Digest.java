package com.zerox;

public class OzDSt1106Digest {
    private static final int DIGEST_LENGTH = 32;

    private byte[] H = new byte[32], L = new byte[32],
            M = new byte[32], Sum = new byte[32];
    private byte[][] C = new byte[4][32];

    private byte[] xBuf = new byte[32];
    private int xBufOff;
    private long byteCount;

    private GOST28147Engine cipher = new GOST28147Engine();
    private byte[] sBox;

    /**
     * Стандартный конструктор
     */
    public OzDSt1106Digest() {
        sBox = GOST28147Engine.getSBox("D-A");
        cipher.initSbox(true, sBox);

        reset();
    }

    /**
     * Конструктор позволяет использовать определенные значения sbox ГОСТ 28147
     *
     * @param sBoxParam значения sbox
     * @see GOST28147Engine#getSBox(String)
     */
    public OzDSt1106Digest(byte[] sBoxParam) {

        sBox = new byte[sBoxParam.length];
        System.arraycopy(sBoxParam, 0, sBox, 0, sBoxParam.length);

        cipher.initSbox(true, sBox);

        reset();
    }

    /**
     * Возвращает наименование алгоритма
     *
     * @return наименование алгоритма
     */
    public String getAlgorithmName() {
        return "OzDSt1106";
    }

    /**
     * Возвращает размер хеш значения
     *
     * @return размер хеш значения в байтах
     */
    public int getDigestSize() {
        return DIGEST_LENGTH;
    }

    /**
     * Обновляет внутренний буфер по байту
     *
     * @param in байт информации
     */
    public void update(byte in) throws Exception {
        xBuf[xBufOff++] = in;
        if (xBufOff == xBuf.length) {
            sumByteArray(xBuf); // calc sum M
            processBlock(xBuf, 0);
            xBufOff = 0;
        }
        byteCount++;
    }

    /**
     * Обновляет внутренний  буфер массивом байтов
     *
     * @param in    массив байтов
     * @param inOff начальная позиция в массиве
     * @param len   количество байт
     */
    public void update(byte[] in, int inOff, int len) throws Exception {
        while ((xBufOff != 0) && (len > 0)) {
            update(in[inOff]);
            inOff++;
            len--;
        }

        while (len > xBuf.length) {
            System.arraycopy(in, inOff, xBuf, 0, xBuf.length);

            sumByteArray(xBuf); // calc sum M
            processBlock(xBuf, 0);
            inOff += xBuf.length;
            len -= xBuf.length;
            byteCount += xBuf.length;
        }

        // load in the remainder.
        while (len > 0) {
            update(in[inOff]);
            inOff++;
            len--;
        }
    }

    // (i + 1 + 4(k - 1)) = 8i + k      i = 0-3, k = 1-8
    private byte[] K = new byte[32];

    private byte[] P(byte[] in) {
        for (int k = 0; k < 8; k++) {
            K[4 * k] = in[k];
            K[1 + 4 * k] = in[8 + k];
            K[2 + 4 * k] = in[16 + k];
            K[3 + 4 * k] = in[24 + k];
        }

        return K;
    }

    //A (x) = (x0 ^ x1) || x3 || x2 || x1
    byte[] a = new byte[8];

    private byte[] A(byte[] in) {
        for (int j = 0; j < 8; j++) {
            a[j] = (byte) (in[j] ^ in[j + 8]);
        }

        System.arraycopy(in, 8, in, 0, 24);
        System.arraycopy(a, 0, in, 24, 8);

        return in;
    }

    //Encrypt function, ECB mode
    private void E(byte[] key, byte[] s, int sOff, byte[] in, int inOff) throws Exception {
        cipher.initKey(true, key);

        cipher.processBlock(in, inOff, s, sOff);
    }

    // (in:) n16||..||n1 ==> (out:) n1^n2^n3^n4^n13^n16||n16||..||n2
    short[] wS = new short[16], w_S = new short[16];

    private void fw(byte[] in) {
        cpyBytesToShort(in, wS);
        w_S[15] = (short) (wS[0] ^ wS[1] ^ wS[2] ^ wS[3] ^ wS[12] ^ wS[15]);
        System.arraycopy(wS, 1, w_S, 0, 15);
        cpyShortToBytes(w_S, in);
    }

    // block processing
    byte[] S = new byte[32];
    byte[] U = new byte[32], V = new byte[32], W = new byte[32];

    protected void processBlock(byte[] in, int inOff) throws Exception {
        System.arraycopy(in, inOff, M, 0, 32);

        //key step 1

        // H = h3 || h2 || h1 || h0
        // S = s3 || s2 || s1 || s0
        System.arraycopy(H, 0, U, 0, 32);
        System.arraycopy(M, 0, V, 0, 32);
        for (int j = 0; j < 32; j++) {
            W[j] = (byte) (U[j] ^ V[j]);
        }
        // Encrypt gost28147-ECB
        E(P(W), S, 0, H, 0); // s0 = EK0 [h0]

        //keys step 2,3,4
        for (int i = 1; i < 4; i++) {
            byte[] tmpA = A(U);
            for (int j = 0; j < 32; j++) {
                U[j] = (byte) (tmpA[j] ^ C[i][j]);
            }
            V = A(A(V));
            for (int j = 0; j < 32; j++) {
                W[j] = (byte) (U[j] ^ V[j]);
            }
            // Encrypt gost28147-ECB
            E(P(W), S, i * 8, H, i * 8); // si = EKi [hi]
        }

        // x(M, H) = y61(H^y(M^y12(S)))
        for (int n = 0; n < 12; n++) {
            fw(S);
        }
        for (int n = 0; n < 32; n++) {
            S[n] = (byte) (S[n] ^ M[n]);
        }

        fw(S);

        for (int n = 0; n < 32; n++) {
            S[n] = (byte) (H[n] ^ S[n]);
        }
        for (int n = 0; n < 61; n++) {
            fw(S);
        }
        System.arraycopy(S, 0, H, 0, H.length);
    }

    private static void intToLittleEndian(int n, byte[] bs, int off) {
        bs[off] = (byte) (n);
        bs[++off] = (byte) (n >>> 8);
        bs[++off] = (byte) (n >>> 16);
        bs[++off] = (byte) (n >>> 24);
    }

    private static void longToLittleEndian(long n, byte[] bs, int off) {
        intToLittleEndian((int) (n & 0xffffffffL), bs, off);
        intToLittleEndian((int) (n >>> 32), bs, off + 4);
    }

    private void finish() throws Exception {
        longToLittleEndian(byteCount * 8, L, 0); // get length into L (byteCount * 8 = bitCount)

        while (xBufOff != 0) {
            update((byte) 0);
        }

        processBlock(L, 0);
        processBlock(Sum, 0);
    }

    /**
     * Финализирует преобразования и возвращает хеш значение
     *
     * @param out    ссылка на массив который будет содержать хеш значение
     * @param outOff начальная позиция в массиве
     * @return количество записанных байт
     */
    public int doFinal(
            byte[] out,
            int outOff) throws Exception {
        finish();

        System.arraycopy(H, 0, out, outOff, H.length);

        reset();

        return DIGEST_LENGTH;
    }

    /**
     * reset the chaining variables to the IV values.
     */
    private static final byte[] C2 = {
            0x00, (byte) 0xFF, 0x00, (byte) 0xFF, 0x00, (byte) 0xFF, 0x00, (byte) 0xFF,
            (byte) 0xFF, 0x00, (byte) 0xFF, 0x00, (byte) 0xFF, 0x00, (byte) 0xFF, 0x00,
            0x00, (byte) 0xFF, (byte) 0xFF, 0x00, (byte) 0xFF, 0x00, 0x00, (byte) 0xFF,
            (byte) 0xFF, 0x00, 0x00, 0x00, (byte) 0xFF, (byte) 0xFF, 0x00, (byte) 0xFF};

    /**
     * Сбрасывает внутренее состояние
     */
    public void reset() {
        byteCount = 0;
        xBufOff = 0;

        for (int i = 0; i < H.length; i++) {
            H[i] = 0;  // start vector H
        }
        for (int i = 0; i < L.length; i++) {
            L[i] = 0;
        }
        for (int i = 0; i < M.length; i++) {
            M[i] = 0;
        }
        for (int i = 0; i < C[1].length; i++) {
            C[1][i] = 0;  // real index C = +1 because index array with 0.
        }
        for (int i = 0; i < C[3].length; i++) {
            C[3][i] = 0;
        }
        for (int i = 0; i < Sum.length; i++) {
            Sum[i] = 0;
        }
        for (int i = 0; i < xBuf.length; i++) {
            xBuf[i] = 0;
        }

        System.arraycopy(C2, 0, C[2], 0, C2.length);
    }

    //  256 bitsblock modul -> (Sum + a mod (2^256))
    private void sumByteArray(byte[] in) {
        int carry = 0;

        for (int i = 0; i != Sum.length; i++) {
            int sum = (Sum[i] & 0xff) + (in[i] & 0xff) + carry;

            Sum[i] = (byte) sum;

            carry = sum >>> 8;
        }
    }

    private void cpyBytesToShort(byte[] S, short[] wS) {
        for (int i = 0; i < S.length / 2; i++) {
            wS[i] = (short) (((S[i * 2 + 1] << 8) & 0xFF00) | (S[i * 2] & 0xFF));
        }
    }

    private void cpyShortToBytes(short[] wS, byte[] S) {
        for (int i = 0; i < S.length / 2; i++) {
            S[i * 2 + 1] = (byte) (wS[i] >> 8);
            S[i * 2] = (byte) wS[i];
        }
    }

    /**
     * @return размер хеш значения в байтах
     * @see OzDSt1106Digest#getDigestSize()
     */
    public int getByteLength() {
        return 32;
    }
}
