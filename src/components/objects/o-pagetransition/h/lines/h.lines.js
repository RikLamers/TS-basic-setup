import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';

import { Slider } from '../../../../modules/m-slider/js/m-slider.javascript';
import { TextSlider } from '../../../../modules/m-text-slider/js/m-text-slider';
import { Img } from '../../../o-img/js/o-img.javascript';
import { Intersection } from '../../../o-intersection/js/o-intersection.javascript';
import { PageTransition } from '../../js/o-pagetransition.javascript';

class Lines extends Highway.Transition {

    in({ from, to, done }) {
        // Transition for the page the user is navigating to
        const linesOut = new TimelineLite();

        const container = document.getElementsByClassName('o-pagetransition')[0];
        const lines = document.getElementsByClassName('o-pagetransition__line');

        setTimeout(() => {
            for (let i = lines.length -1; i > -1; i--) {
                linesOut.call(() => {
                    if (i === lines.length - 1) {
                        container.style.background = 'transparent';
                        from.remove();
                    }
                })
                .fromTo(lines[i], .5, {
                    transform: 'translateX(0)'
                }, {
                    transform: 'translateX(-100%)',
                    onComplete: () => {
                        if (i === 0) {
                            container.style.zIndex = '-1';
                            new Slider();
                            new TextSlider();
                            new Img();
                            new Intersection();
                            new PageTransition();
                            done();
                        }
                    }
                }, '-=.1');
            }
        }, 2500);

    }

    out({ from, done }) {
        // Transitions for the page that the user is leaving
        const linesIn = new TimelineLite();

        const container = document.getElementsByClassName('o-pagetransition')[0];
        const lines = document.getElementsByClassName('o-pagetransition__line');

        container.style.background = 'white';
        container.style.zIndex = '9999';

        for (let i = 0; i < lines.length; i++) {
            linesIn.fromTo(lines[i], .5, {
                transform: 'translateX(-100%)'
            }, {
                transform: 'translateX(0)',
                onComplete: () => {
                    done();
                }
            }, '-=.1');
        }

    }

}

export default Lines;