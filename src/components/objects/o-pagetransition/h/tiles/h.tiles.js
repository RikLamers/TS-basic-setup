import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';

import { Slider } from '../../../../modules/m-slider/ts/m-slider.typescript';
import { TextSlider } from '../../../../modules/m-text-slider/js/m-text-slider';
import { Img } from '../../../o-img/ts/o-img.typescript';
import { Intersection } from '../../../o-intersection/js/o-intersection.javascript';
import { PageTransition } from '../../js/o-pagetransition.javascript';

class Tiles extends Highway.Transition {

    in({ from, to, done }) {
        // Transition for the page the user is navigating to
        const tilesOut = new TimelineLite();

        const container = document.getElementsByClassName('o-pagetransition')[0];
        const tiles = document.getElementsByClassName('o-pagetransition__tile');

        setTimeout(() => {
            for (let i = 0; i < tiles.length; i++) {
                if (i < 8) {
                    tilesOut.add(() => {
                        if (i === 0) {
                            from.remove();
                        }
                    })
                    .fromTo(tiles[i], .25, {
                        opacity: 1
                    }, {
                        opacity: 0
                    }, '-=.1')
                    .fromTo(tiles[tiles.length - i - 1], .25, {
                        opacity: 1
                    }, {
                        opacity: 0,
                        onComplete: () => {
                            if (i === 7) {
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
            }
        }, 500);

    }

    out({ from, done }) {
        // Transitions for the page that the user is leaving
        const tilesIn = new TimelineLite();

        const container = document.getElementsByClassName('o-pagetransition')[0];
        const tiles = document.getElementsByClassName('o-pagetransition__tile');

        container.style.zIndex = '9999';

        for (let i = 0; i < tiles.length; i++) {
            if (i < 8) {
                tilesIn.fromTo(tiles[i], .25, {
                    opacity: 0
                }, {
                    opacity: 1
                }, '-=.1')
                .fromTo(tiles[tiles.length - i - 1], .25, {
                    opacity: 0
                }, {
                    opacity: 1,
                    onComplete: () => {
                        if (i == 7) {
                            done();
                        }
                    }
                }, '-=.1');
            }
        }

    }

}

export default Tiles;