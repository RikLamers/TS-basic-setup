/*==============================================*/
// SENTRY
/*==============================================*/
// Sentry.init({ dsn: 'https://b9d1e0fd261f43169d1dc4aa34a42854@sentry.io/1549293' });

/*==============================================*/
// CSS
/*==============================================*/
import './index.scss';

/*==============================================*/
// Modules & Objects
/*==============================================*/
import Header from './components/modules/m-header/ts/m-header.typescript';
new Header('.m-header');

import Navigation from './components/modules/m-navigation/ts/m-navigation.typescript';
new Navigation('.m-navigation');

import Img from './components/objects/o-img/ts/o-img.typescript';
new Img('.o-img');

import Slider from './components/modules/m-slider/ts/m-slider.typescript';
new Slider('.m-slider');

import Tab from './components/modules/m-tab/ts/m-tab.typescript';
new Tab('.m-tab');

import ActiveTab from './components/objects/o-active-tab/ts/o-active-tab.typescript';
new ActiveTab('.o-active-tab');

import Btn from './components/objects/o-btn/ts/o-btn.typescript';
new Btn('.o-btn');

import ConnectionCheck from './components/objects/o-connection-check/ts/o-connection-check.typesctipt';
new ConnectionCheck('.o-connection-check');

import DetectColorScheme from './components/objects/o-detect-color-scheme/ts/o-detect-color-scheme.typescript';
new DetectColorScheme('.o-detect-color-scheme');

// import Encrypter from './components/objects/o-encrypter/ts/o-encrypter.typescript';
// new Encrypter('.o-encrypter');

import Intersection from './components/objects/o-intersection/ts/o-intersection.typescript';
new Intersection('.o-intersetion');

import Modal from './components/objects/o-modal/ts/o-modal.typescript';
new Modal('.o-modal');

import Pagination from './components/objects/o-pagination/ts/o-pagination.typescript';
new Pagination('.o-pagination');

// Rik Lamers - https://www.riklamers.com - rik@riklamers.com
// Developr lab - https://www.developr-lab.nl - rik@developr-lab.nl
