import Vue from 'vue';

Vue.directive('meu-transform', {
    bind(el, binding, vnode) {
        let current = 0;
        el.addEventListener('dblclick', function() {
            let incremento = binding.value || 90;
            if(binding.modifiers.reverse) {
                current -= incremento;
            } else {
                current += incremento;
            }
            el.style.transform = `rotate(${current}deg)`;
            if(binding.modifiers.animate) el.style.transition = `transform 0.5s`;
        });
    }
});