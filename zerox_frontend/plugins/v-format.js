import Vue from 'vue'

Vue.directive('format', {
    bind: function (el, binding, vnode) {    
        var key = binding.expression;    
        const pattern = new RegExp('^[0-9]+$')
        var input = el;    
        input.addEventListener('input', function () {    
            
        vnode.context.$data[binding.expression] = input.value.toString().split(' ').join('')   
        });    
    },  
    update: function (el, binding, newVnode, oldVnode) {    
        var input = el;    
        input.value = binding.value.toString().split('').filter(char => char !== " ").join('').toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        
    } 
})