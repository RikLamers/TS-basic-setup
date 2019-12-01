import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';

class FadeT extends Highway.Transition {

    in({ from, to, done }) {
        // Transition for the page the user is navigating to
        const fadeIn = new TimelineLite();
        fadeIn.fromTo(to, 1, {
            opacity: 0
        }, {
            opacity: 1,
            onComplete: function() {
                from.remove();
                done();
            }
        });
    }

    out({ from, done }) {
        // Transitions for the page that the user is leaving
        const fadeOut = new TimelineLite();
        fadeOut.fromTo(from.children[0], .5, {
            opacity: 1
        }, {
            opacity: 0,
            onComplete: () => {
                done();
            }
        });
    }

}

export default FadeT;