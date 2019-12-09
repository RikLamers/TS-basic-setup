import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';

import { Slider } from '../../../../modules/m-slider/ts/m-slider.typescript';
import { TextSlider } from '../../../../modules/m-text-slider/js/m-text-slider';
import { Img } from '../../../o-img/ts/o-img.typescript';
import { Intersection } from '../../../o-intersection/ts/o-intersection.typescript';
import { PageTransition } from '../../js/o-pagetransition.javascript';

class TriangleRight extends Highway.Transition {

    in({ from, to, done }) {
        // Transition for the page the user is navigating to
        const triangleOut = new TimelineLite();

        const container = document.getElementsByClassName('o-pagetransition')[0];
        const triangles = document.getElementsByClassName('o-pagetransition__triangle');

        setTimeout(() => {     
            triangleOut.fromTo(to, .3, {
                opacity: 0
            }, {
                opacity: 1
            })
            .fromTo(triangles[0], 1, {
                transform: 'translate(0, 0)'
            }, {
                transform: 'translate(100%, -100%)'
            }, '-=.3')
            .fromTo(triangles[1], 1, {
                transform: 'rotate(180deg) translate(0, 0)'
            }, {
                transform: 'rotate(180deg) translate(100%, -100%)',
                onComplete: () => {
                    container.style.zIndex = '-1';
                    new Slider();
                    new TextSlider();
                    new Img();
                    new Intersection();
                    new PageTransition();
                    done();
                }
            }, '-=1');
        }, 1000);

    }

    out({ from, done }) {
        // Transitions for the page that the user is leaving
        const triangleIn = new TimelineLite();

        const container = document.getElementsByClassName('o-pagetransition')[0];
        const triangles = document.getElementsByClassName('o-pagetransition__triangle');

        container.style.zIndex = '9999';

        triangleIn.fromTo(from.children[0], .3, {
            opacity: 1
        }, {
            opacity: 0
        })
        .fromTo(triangles[0], 1, {
            transform: 'translate(100%, -100%)'
        }, {
            transform: 'translate(0, 0)'
        }, '-=.3')
        .fromTo(triangles[1], 1, {
            transform: 'rotate(180deg) translate(100%, -100%)'
        }, {
            transform: 'rotate(180deg) translate(0, 0)',
            onComplete: () => {
                from.remove();
                done();
            }
        }, '-=1');

    }

}

export default TriangleRight;