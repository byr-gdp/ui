/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(23);

	__webpack_require__(30);

	var _notice = __webpack_require__(21);

	var _notice2 = _interopRequireDefault(_notice);

	var _form = __webpack_require__(22);

	var _form2 = _interopRequireDefault(_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var root = document.querySelector('#root');

	_form2.default.switch();

	root.addEventListener('click', function (e) {
	  if (e.target.dataset.category === 'toast') {
	    _notice2.default.toast(e.target.dataset.type, e.target.dataset.type);
	  } else if (e.target.dataset.category === 'alert') {
	    _notice2.default.alert(e.target.dataset.type, e.target.dataset.type);
	  } else if (e.target.dataset.category === 'messageBox') {
	    _notice2.default.messageBox('提示', '这是一个 messageBox', function () {
	      _notice2.default.toast('You confirmed', 'success');
	    });
	  } else if (e.target.dataset.category === 'notify') {
	    _notice2.default.notify(e.target.dataset.type, '提示', '这是一条不会关闭的消息');
	    // 理想调用方式，以 success 为例：
	    // notice.notify().success('提示', '这是一条成功的消息');
	  }
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACvUlEQVR4Xu2a63XUMBBGv6kASqADQgVABYQOkgoIHUAFJBUQKoBUQKgA6IB0ECoYzuyR9mgXa63H6GVbf1cr+17PWCPJhJU3Wjk/NgFbBKzcwJYCKw+A7SW46BRg5qcAXgI4A/ALwA8ienSjfrECmFmgvwJ45gD/AfCWiETGri1SgIH/DkAi4LhJBLy2EhYnYAbeythLWJSAQHhXwovFCIiEtxLuFiEgEV4kPA4vIANeBDwMLYCZLwB88rztQ4rcm2EFGPjPIZSePr+J6GxIARrwAF5JVTicAE344SpBbfihBJSAH0ZAKfghBCjA3wG4OF4GD7EaVID/QkRSK3hbt7NADfhuU6AW/KQAZn4H4MrspMgOyjUR3WRUXFF/rQn/nwBmltJyKmduiegyiiShc234AwEn4C1KUQnMLIsaibzUNvvCmxp49xIMgC8qIeL6PjlJ8LsIYGaxLvZDm2oktIS3An6affNQAdJPRUJreCuAY8idvrcA3vsqrLkxe4C3Ar4BeDN3w57f5YBB9tgPTlvmxuoF3gqQExRJg9QWJaEn+P00qDD/BklQgP9IRB9Sn5R3GjRToRRAOXtsJyUowF8Skbx3VNvBYqhUJPQKv08BV6m2hJ7hJwU46XAN4ElivO3SwRRYJ9fjM+MXCXv3mt79AHPicp8hQabGqePpUKfF4b0RYO9QQUIo7HG/KvCzAkw6SJ2QEwmxEqrBBwmoLKEqfLCAShKqw0cJKCyhCXy0gEISmsEnCVCW0BQ+WYCChL/mtEaW4k1b1sFIYp0g8HI2v/9YsaWBLAGJkSAbKFJXdNGyBURKaJ7zx9ZVBARIkLC/KrGezw0jNQGOBNm0eO7c2AOA815yvlgEuAMz87nzifp97KZp7lON+b9qBMRcuJe+m4BenkSr+9gioJX5Xq67RUAvT6LVfaw+Av4BGhVKcKdtCU4AAAAASUVORK5CYII="

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC20lEQVR4Xu2b7U3EMAxA7QlgBJgA2AAmACYAJgE2YAPYAJgAmABGgA1gAiNLyelUXRsn8Ueku/69U+L34jZp6iBs+YVbzg87AbsM2HIDoluAiI4B4Dy5+kLE15G9ERHHyjHz9YqIX3PxLgogon0AeASAi0kD3wBwudRwhKA0UBxvhs9hvKd4f6dxlQRwY9czMNzY2SgSEvwbAPCgbbreEfFMLCA1+FkYySEkCOAzxsl0wGYzgIjuAOBWkMqhEirgGeUeEZlrdWkI4MZCJFTCVwvgB9+zIAPyX1wlNMBznDeI+CTKAP4TEfH0cTSahEb4H0Q8ED8EkwCeTngK2RtFQiP8HwCcbpqxiguh1OEQErTheVCLAkbJBAt4sYBoCVbwVQKiJFjCVwvwlmAN3yTAS4IHfLMAawle8F0CrCR4wncL0JbgDa8iQEtCBLyagF4JaZm9tJmxaSU+u7ytWLbLVoLSBjuWzdzF3E6OGbxqBuQoGyVIHfP/VEY+dyh6F6iJruN2kHSjCm+SAYaZoA5vKkA5E0zgzQUoSTCDdxHQKcEU3ltA7TzP8ZlvtJrMAuuP88YV3noTphJMBSjAZxFmEswEKMKbSjARYABvJkFdgCG8iQRVAY3wPNXxFfLxRU1AB/xpEhDy8UVFQA98/lzV+BbZPTt0C9CA73yB6pLQJUATPkpCswAL+AgJTQIs4b0lVAvwgPeUUCXAE95LglhABLyHBJGASHhrCUUBI8BbSiiVynKRVO1Ojuk2lvaKsSSAS2WnhcdL+/em8J2Z8I2Ih9PglypFawslXeA7JcgLJStqhTkmV/gOCSa1wiHwjRKqBPC9XyqXD4VvkCAvl08fNLiw+GrmqTcEfIWED0TMmy8rpNIswN/sHzZI+OFjNKOcFplI4EGbFnh/pHjrjsxMGs7nhvjQ1MvSXBj9GxFxrHn6fmk+NBUN4tF/cSnsEURkHzsBkfZH6HvrM+AfCooeX5tref8AAAAASUVORK5CYII="

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE6ElEQVR4Xu1a4VGUMRDdrUA7ECsQKhAqUCsQKxArECoQKhAqECsQKhArEDvQCtZ5zH7MXi7Jt0kWjoEvM/zgLrdJ3r683WzC9MQbP/H10wLAwoAnjsCyBTZBABHZJaIfdmxm3ogzNjLoowVARJ4T0XsiOmPmvyV29QIgItvMfBXJ2jAG6KK+EtEWER0x82EkACLyloi+EdGx2i8C3AJQCAAigkl9NANjcjvMfJ2bTA8DROS3gguTsPuJmc9bFpvrGwXA5B07BrbBfgQAIgI2fU5sVVnmBSYEAAwmIhdE9DoZeI+Z8flKa2GA6gq8D32Z2h8igh4Mb4NIALaJ6Gey1gtm3hsE4FSF1Zr5wMz4fLiFAaAscE3WywCofgbUS2ZGHhHSogEATSFQz8zs8D8E8ZauDQAgWUoXm91WvWiEAqAsmBUsEUGotAKJ/QwhvW0m7NmPi8J65wCo1648wiMi8PoLM6lm2iZhD6b+qfBlQ+s0lgIHQIt5iAXLxQD12CRwB8x8VkPceA+TPmRm5AlNTdX/wIS/ueQKevHFbBnXVvECgAzMUhTpKBKRtRBnPIFFH5eSIS8aKoQQ190c+xQoLDzNOda0JzfmLACFvTjZQiYGIKq09C62tZ+IIDkCS2yOYM1gblX2eQCACsPIq8oEsd9OPPrQushcf3UKvA4xzTVsvYmB1WRpFgBDaVAMRm2Is4NjICQow/n5jL6k5460O/QJuuNipRsAjJIRpnRwl/CMsEAFGRqUOuJSF17UpS4NKFAQ1IMn3pjvQw4nHnCSwxHOBfB4V2rcxIB0cpobAAgAsnVfGqBshKfxh0jTfSgaAsDoQ3ilxsOEiD4hAERMZFM2FgA2hXzEuBoR7JmjZvZXTiuKDBARcU7ye3qSc/5uuFuhVFaymw3REQDcW/jLRKHc0XsBoIDAwoDc6bW2Bbwp5WlvFjYqAiqCuQPR9Z2cBUYn/BB/v+QBD9Er9zmnYQZoyQrlqua638hCRQRlOhyLhwox3QBkanF3Xgswhy8UZ3ATjYbCB47D1UJtCewuAAq1OFcRcsTregxG/Q8V6lT9EbWQlHmj181UmgBw1OJARxQp76xlruLTsVAYARBxJTHd57bmnltgUy2uFyHdetAbvEQpNRRI0GdWH2YZICLwKBZfal21uF4AjA5gC+AsUAMipCyOgXA/n7ZqLS7yPU/NlpblAET6NsH1hmCWASo89tQ1W3PXFBWgoUSOUnlXzU7pDrXHrdTL2r7OAOGKSi4AFATEXPzN1tw1Rk9XaTf7kZmPWmifiTTnzPxuzoaIIESiQBt3OTqFH48nc3f/RLRSNFHPpjdNKxUbEQF7bNkd03B5dQ4k+72bAV6jIoIYjZta21boWwBpZXFmG1k7uJ7f8c7F0y8UAKXflKFN469VjDwAZLRnshf2PggGwwAovOaCYK5dmDQAkHtyA00Bo7qENWVFJAC5+lzWW14AlAU27y+yykP3XJ8QAAr7FaKWasHNHFoAMBEoFc1qWPQCEgVA7nlcUbE7AFh7Xq8PsrMvUb2LD9MA3f/YAtN74epdQSsAygIbFk80HxnWgRAGTIjrwqb3PMXTWCcASMlx1N1vPfLWGBEKgJd6PQB4bbf2WwBoRSyiv2pGGiFcjzAjxrc2NsKA6EWM2FsAGEHvMfx2YcBj8OLIGv4D9SdqX0ltnwkAAAAASUVORK5CYII="

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE+ElEQVR4Xu2bXZLaRhDH/y1S+xrCHiD4BEFwALMniH0Ck6pA5S3sCbI+wSpvKUhV8AninMD4AAubE5gcYBX8uglq16DFRkLzqUHI5eVVo1H/f93T0/MB4Qv/0ReuH48AqoqA5mL4tEHUZqBNCTogbma+zbTmALcErDbMq3V3+rYK244WAc3lT+0Am++J8QygvpsYnjPhdYLGX+vwt5VbH+q3vAM4X45eMPOYQB2fBjP4loiiu3Dyyme/3gCkwnFFQNungfm+GFgR4coXiNIAmssf+wHTtW+P6yCKiEiIL9fh73NdW9XzUgBaN6NrIozLGFD2XWZEcW9y6dqPE4BtguPNn1V7XSYyjYbGc5dEaQ2guRx2AsYbAmWnMVcXeHqPweuEcLEOp7c2XVoBqKv4nWAXCMYA6i7eFYIRgIcxv6xb2CtywjqhRmiSE4wAtBZDId5rYWMzTl3aisQYd6eh7l0tgNbNMCKin3Ud1fE5M/8a96bKaVoJQBQ5DQ7e1FGcqU0bSi5UxZISwOcY+oels3ooSAGcL4cDMP1hSrrKdsy4BGFAwHdG3yX+4S6czoraSgG0FqN3x17YGBmfb/QgZjstJzQnwte6fsQCKu5OnhgDqK33c560ylGSKCiMgFqOfYkAU2fJpsUDAKLoaXDyThdWlT5XjGFhh+lUvaHgSb44OgBg2lllADTihR3GUcB4GfcmV/u2HwKoU9XnUXwqmt/edaeZ/ckMgOZy0Gzw2b+VeVf1Ie/i049t6P6bdThb7z6dA1CTyu9I4lMA2cowA6B1MxoT4fqkEXBE8dtBwLiMe5OoMALKJkAG/0Ogb50BHln8A4BMIsxEwPliOAfoqYsABl4ldD8O+GxuXKJm0rG8XN01M832avuzidATgE+dikRqDaECz3+C4hkAA38ndN/fz6xWECoVfzgVlooAZrxPAu4X7cQaQahcvGcAIDy/CyevZWNOCeEk4j0DSA8k/rvYD/88jEIIJxOvAeAyDVpDOKl4UQdk9wnzhdAVEX6xnQZNITRw1lcNGZuFja2Nu/bKQshqgyFngQkEndF+5nn1V5SlcNnFUJlDyirEaxdDokFrMRL3dMw2Gwtgu5zPVSVe1Cxxd5I54DnKhogNhKrEp+uAw4OSgi2xYafBtNSNV91zEwhVik/Dn8N80SbZFC03DD5mXMWZfdXii8Jf2FkIwKdxRZHgs39dJH58brMtvq3ekjNxG0t76GBiwD6EU4gXa5a4Nym80SI/GboZORVFMiACAogiYmR2ZU0Alm3DBbvBuz51h6OrUjs8ZS338L7YpYq7U+ndxcfjcR3k1mI0I+CFrl0dn4tturg7Gahs094QMdrYqKH6op2qIjO1AMRLNkfRdWCh2qnK22cE4HOCYCNeWgjJvCjmcE4o8lUf+I4WIZ4CHstugzgPgf0X6zocbD1vVAfIPJTeGiUxOzgvm316P014PLC9J2w9BLKRsD0AiU49Re5OpFQbs6WmQZ2nzpejZ8wcVV0xigov9foJ/zCxg/OweBI3MsXpspcFlHRNwXgPIEqC+8jV6/t9G0+DukhIp8rtKnIA2v5pyv2UuOBjwuNgEsJnPoSXSoJmMMQ9PgxA1HdNliK5gXmeBJi5JDgTO71GgHzWGDSBrzpBEvRBaBO4cHXGoBUYqyRI5sD/tz49LbOtEgAmnjhVm0cApyJfl+9+APTTF273CjauAAAAAElFTkSuQmCC"

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEEUlEQVR4Xu2b/1XcMAzHv56gMEFhgsIEkFuAMEHpBKUTlE7QMkFhgpoFCExQmKAwQWEC930T58gdzm/JuVfi9/iLO1v6WJJlWWfwxod54/pjBjBbgDKBNHM7BjhwwB5e/rZqln0CcMc/A9w54NYm5kFTRBUXSDNHBT8COPFKj9GBQC4AXNrEEJDoEAXA3Qbw1SsuKqifjCC+SVqFCAC/498VFV+HSRBfJCxiNIA0c58BnAGo82sNS+CcdIczm5jzMQsMBuB3/ReAwzECCHzXAvg01BoGAUgzx4ieTbDrdbx4UhzbxDBg9hq9AWyg8qXCdImkL4ReADZY+cEQOgNQUd7hOZfc4F0vu23+cC9L6ATAB7w/Yj5PxQ1Sm5gb6pJm7hAOVhAEY8J+l8DYFQADnmS0p6/mypcjh1AEVqlhbWKO2yZrBZBm7hQAkxyZ4fBsFyaYM6TX7knQCigvk6UfTYI3AhA3fUricGsXJmhN6bW7gcGBDOl8FsaD3SZXaAPAlJOXGrkRFwDl5iWKl7LgqAXgLzYMfLIjPgDKTysIXqubAMjvfnwXKDev1gqCALzv/5Xdej/bNBbAxbdDsaAOgGzkr5KcDkDwRKgD8FugkhM2oOkA3NnE7K8L9QqAWvArV54OQNANQgB4ZPxU8f/pgmCpDq/MrB8sRwgAMydWeXTGtBZwbhPD+NYAQD4bWwU5JYDA2iEL4PGnV9+bEgDwYBOz2+YCTsf2J88DcgFsYlY2PWQBM4DZAjQJTBsDZheYY0BrEJQvS21SHvBoF4YPuHMiVBKInwoDTzYx26E4m2ZONwkDOqTCmdO9DBWaxyiLhxjzEZWVrsbLEH1Evha4Kg6rtRQmv5mlmUv9DVQvBS/Wf1UVChdErt0DDN5rpgPR53a4twvDV+2VEb8kFl3z5YK9SmIx3CA2iu5FUe+XOmXxqto6r8MhsP3K4h6AnhXovw6vQ+j/MKJsBTGPwWFPYx7AFhx4Isg1MMR8HS4sbWfw46iHIP1IEjMTHPc8XjqSwrN1DBe4solhgtU4WhsklFyBmSBr9C8tMgB7DmUyQYdHGOyJtch4CHtwYAODXDwoGhg4ZBTnTIXfH3Ztl+tkAUtXYIOkPIQ2K+3+/57Kc+JeABQtobuSdZ8coPwgABUIbGvbjAtT4fNsu9Nvla24A/2W6fLR+O0bNcMV2/S7BLzQKr1dYH2SvI3O4Uw4OLYTKUye7fKNbXBtE40GsDwmAQoi21FWL/0lgNOhu16dVgRAxS14geKPJ7RAUHHuutgPqUQBrMWHEzicwOBDmxk2/t/hHiaPNRcSO76+lgqA6iK+44wpKXMIlqR2ak8PRnPkl6/8p3N8zNVQWs0FRu30RF9Wt4CJ9Oq87AygM6r/9IP/AAV8DV+G3jTzAAAAAElFTkSuQmCC"

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFC0lEQVR4Xu2bTXYaORCAq2QgdG/GOUHILpBF8AkCC8MyzAnGPkHICZI5QcgJ7JwgzGoeeGF8AuPF0LMLPsHYm+7EdrrmqRv8+OkfSS11+z3bOz9KUtWnUlXppxEe+R8+cvvhCcCTB+RA4Gb8uumD/9YnqCFCkwB3EaC5OjQBTBHoigimDGHOgJ1VOv9MTatnbAn8PGm88wl6BNBDgF0VQwjgCgGGDGH4bH/2l0ofaW20AqDT2u6PO/s9EfRVjY5TOICBMKiW3C/Ynl+lGSb6uxYAJg3fNEQ3iMwAvJNXLfDxCBBrotS1yBHNgdGhtf/vJEt/mQC4o/pnROxnUSBrWyIa2F3ng2o/SgC4y3u39ulmJFdVIms7nkGssttWiQ3SAHhKuwM6eijGL+FxCCXAQ9nUKQVgYTyfeaW0lnWm09rzAFkCbMtAEAbw0Nw+IV1KLQdhAO64ca7P7emSEfR9n4JKjzFs+gjHAPhb2iyL/M6Xg92Z7YnICgFwx/UBAr4X6TBdhi6rZa+5GbCCWuLWmuuDQF/sjpOaoVIBBHme2Gm6YWISjOj3Z11nGCX9c1Tv+YjfxHoSkEK/nVYnJAIIZuXGOtdZ5FTL7vO4dOX9/aoGO+y7gGliIkRzq+u8TBJOBOCNGp8A4aPYaGJSVmeWPOa4QWI9CUoR/Gl1Z5/ipGOVWUT977pTXt4AeGq0yu7LOK+LBWBi9vks5A0gmPkEL4gF4I4b/+me/aIAcC+wO7PnUcsgEoD2aLwyciEewGuNmOwTCcAb1Y8B8Q/BMCMlVhQAIPpqdZ2DTWUjAZhy/6KWQBgGopfBFgC+4fkFdC41rRLChXkAAOwA7m1ulLYA/Dip94nws4RNUqJFAkCkD9V9Z7Cq8BYAvXX/NpsiARBs7w+2AHjj+gQA30pNq4RwkQAA6MzqOK0UD9C57X1YHiAEwNNdi28wKNYDtivRiCWgeTPyBGCdQK7b4YjYtOmBuXtArgciKgDcUWOKCG8kArucKNG8WvH2oo7EvFtb+/Z7XTmBLGA6DYbbU5ozhn3/zr/g/7ISe+P7NNB58hQ9KwIATBdCcu6iV1qoEDJdCus1Sa43oVLY9GZITmW90kKbIT6kN65f6Tqf12tClt7o2uo4W1d6uR+IZDEhU1uZAxGTR2KZjMjQWOpILJdlQPQVGQR3g+RD09QRXMiMLq2OE/mCJfdj8UCfiCsr3Vdwa86iciyu+7LyXqEEZczcRdB1tezVpC9GgmVg4GosKhUt4RhJwapXY8HKCa+spwD4IkP8WWua73lA/NpfKpX79XjU+l8qoz0OZL0eXyqmd39AE6vjtKM8yhvXTwFw7cxO1fOi6v6ovlI94B6Cxm0yEQ2tine4DEzBTfSNdYSIPVWDV9sRwYXdna09xo7rVxhAqKQ90XtWQItXnnpmPYhbBBdWxW2JvhkUBsA7D6O0z4/NtTxm0jHb633Q9Q6wlpFncqup6o7oWK8nZEfBZ76EeCBjfFCTqQxtZjmoaLIodCXdfnUkJQBmsoMaANFonzkIxnUQ5m7kjxy1FUtiKOgSkA7SnsGl9ZXJA5adh8/p7D4g9c0HSLoGwkHSy680o7Utgc2BzIIIDa9W3IFoihMBocUDogYKDlUAeoDQU/cKbjQMGcAw7nWpiJFJMsYArA4afDaHfiv4bO7+c7nNK3g6CwoZWHw2R2wim9JUYOQCQEWxvNo8AciL9EMd59F7wP9WKIBfECxGCQAAAABJRU5ErkJggg=="

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ui = {};

	// notice 相关

	// alertBox 用于容纳多个 alert DOM
	var alertBox = document.createElement('div');
	alertBox.classList.add('alert-box');
	document.body.append(alertBox);

	// loading DOM，全局维护一个实例
	var loadingIns = null;

	var notice = {

	  /**
	  * Alert
	  * @param {String} title
	  * @param {String} type success/warning/info/error
	  */
	  alert: function alert(title, type) {
	    if (typeof title === 'undefined' || title.toString().trim().length === 0) {
	      throw new Error('title 不能为空或未定义');
	    }

	    switch (type) {
	      case 'success':
	      case 'warning':
	      case 'error':
	        break;
	      default:
	        type = 'info';
	    }

	    var dom = document.createElement('div');
	    dom.className = 'alert-wrapper alert-' + type + ' alert-wrapper-hide';
	    var tpl = '<span class="alert-title">' + title + '</span>\n          <span class="close-text">\u5173\u95ED</span>';

	    // 通过 DOMParser 解析 html 片段样式不能生效，http://krasimirtsonev.com/blog/article/Convert-HTML-string-to-DOM-element
	    // let parser = new DOMParser();
	    // let el = parser.parseFromString(tpl, 'text/xml').firstChild;
	    // document.body.append(el);

	    dom.innerHTML = tpl;
	    alertBox.insertBefore(dom, alertBox.firstChild);

	    setTimeout(function () {
	      dom.classList.remove('alert-wrapper-hide');
	    }, 0);

	    dom.addEventListener('click', function (e) {
	      if (e.target.className === 'close-text') {
	        dom.classList.add('alert-wrapper-hide');
	        setTimeout(function () {
	          dom.remove();
	        }, 500);
	      }
	    });
	  },

	  /**
	   * Loading：思考如何采用单例模式，全局只有一个 loading 实例。
	   * @param {HTMLElement} target loading 需要覆盖的 DOM
	   * @param {String} text
	   * @param {Boolean} fullscreen 是否全屏覆盖
	   */
	  loading: function loading(target, text, fullscreen) {
	    // 两部分组成：一个遮罩层、一个信息层
	    if (typeof target === 'undefined' || target === null) {
	      target = document.body;
	    }

	    if (typeof text === 'undefined' || text.toString().trim().length === 0) {
	      text = '拼命加载中';
	    }

	    if (fullscreen === true) {
	      dom.style.width = window.innerWidth + 'px';
	      dom.style.height = window.innerHeight + 'px';
	    }

	    var dom = null;
	    if (loadingIns === null) {
	      dom = document.createElement('div');
	    } else {
	      dom = loadingIns;
	    }

	    var tpl = '<div class="loading-mask"></div>\n        <div class="loading-text">\n          <i class="icon-loading"></i>\n          <div class="loading-text-detail">' + text + '</div>\n        </div>';

	    dom.className = 'loading-wrapper';
	    dom.innerHTML = tpl;
	    // 判断 target position，若为 static，设置为 relative，否则不变
	    if (window.getComputedStyle(target).position === 'static') {
	      target.style.position = 'relative';
	    }
	    target.append(dom);
	    loadingIns = dom;
	  },

	  hideLoading: function hideLoading() {
	    if (loadingIns !== null) {
	      loadingIns.remove();
	    }
	  },

	  /**
	   * Toast，模拟微信小程序 showToast 效果
	   * QUESTION: 连续两次调用 toast 效果如何处理？
	   * @param {String} text
	   * @param {String} type default/success/loading/error, default(缺省)表示无任何 icon
	   * @param {Number} duration 单位毫秒，暂不考虑
	   */

	  toast: function toast(text, type) {
	    if (typeof type !== 'undefined') {
	      switch (type) {
	        case 'success':
	        case 'loading':
	        case 'error':
	          break;
	        default:
	          type = 'default';
	      }
	    } else {
	      type = 'default';
	    }

	    if (typeof text === 'undefined' || text.toString().length === 0) {
	      throw new Error('invalid param text');
	    }

	    // let box = document.querySelector('.toast-wrapper')
	    // if(box === null){
	    //   box = document.createElement('div');
	    //   box.classList.add('toast-wrapper');
	    // }

	    var prevBox = document.querySelector('.toast-wrapper');
	    var box = document.createElement('div');

	    box.classList.add('toast-wrapper');
	    box.innerHTML = '\n        <div class=\'icon icon-' + type + '\'></div>\n        <div class=\'toast-text\'>' + text + '</div>\n      ';

	    if (prevBox !== null) {
	      prevBox.remove();
	    }
	    document.body.append(box);
	  },

	  /**
	   * messageBox: 消息弹框，目前一切从简，只有确认后回调
	   * QUESTION: 如何禁止滚动
	   * @param {String} title 弹框标题
	   * @param {String} message 弹框内容
	   * @param {Function} cb 弹框确认成功后回调
	   */
	  messageBox: function messageBox(title, message, cb) {
	    var render = function render(title, message) {
	      return '\n              <div class="message-box-mask"></div>\n              <div class="message-box-container">\n                <div class="message-title">' + title + '</div>\n                <div class="message-content">' + message + '</div>\n                <div class="message-operation">\n                  <button class="btn-cancel">\u53D6\u6D88</button>\n                  <button class="btn-confirm">\u786E\u5B9A</button>\n                </div>\n              </div>\n            ';
	    };

	    var messageBox = document.querySelector('.message-box-wrapper');
	    if (messageBox === null) {
	      messageBox = document.createElement('div');
	      messageBox.classList.add('message-box-wrapper');
	    }

	    messageBox.innerHTML = render(title, message);

	    var box = messageBox.querySelector('.message-box-container');
	    var mask = messageBox.querySelector('.message-box-mask');
	    messageBox.addEventListener('click', function (e) {
	      if (e.target.tagName.toLowerCase() === 'button' || e.target.classList.contains('message-box-mask')) {
	        if (e.target.classList.contains('btn-confirm')) {
	          cb();
	        }
	        box.classList.remove('enter');
	        box.classList.add('leave');
	        mask.classList.add('hide');
	        setTimeout(function () {
	          messageBox.remove();
	        }, 500);
	      }
	    });

	    document.body.append(messageBox);
	    box.classList.add('enter');
	  },
	  /**
	   * Notify: 消息通知，3s 自动关闭，分为 info success waring error 四种状态
	   * TODO: API 调用方式有待改进，期望 notify.success() 的形式，而非 notify('success',...)
	   * @param {String} type 类型
	   * @param {String} title 标题
	   * @param {String} message 消息内容
	   */
	  notify: function notify(type, title, message) {
	    var notifyBox = document.querySelector('.notify-box');
	    var topValue = 10;
	    var notifyItems = document.querySelectorAll('.notify-item');

	    notifyItems.forEach(function (item) {
	      if (item.style.top.length !== 0) {
	        var top = parseInt(item.style.top.slice(0, -2)) + 10 + parseInt(item.offsetHeight);
	        topValue = top > topValue ? top : topValue;
	      }
	    });

	    if (notifyBox === null) {
	      notifyBox = document.createElement('div');
	      notifyBox.classList.add('notify-box');
	      document.body.append(notifyBox);
	    }

	    var updatePosition = function updatePosition() {
	      var leftNotifyItems = document.querySelectorAll('.notify-item');
	      leftNotifyItems.forEach(function (item, index) {
	        if (index === 0) {
	          // TODO: 10px 硬编码替换
	          item.style.top = '10px';
	        } else {
	          item.style.top = parseInt(leftNotifyItems[index - 1].style.top.slice(0, -2)) + 10 + parseInt(leftNotifyItems[index - 1].offsetHeight) + 'px';
	        }
	      });
	    };

	    // 创建一个新的 notify dom
	    var notifyItem = document.createElement('div');
	    notifyItem.classList.add('notify-item');
	    notifyItem.innerHTML = '\n        <div class="icon ' + type + '-icon"></div>\n        <div class="notify-desc">\n          <div class="notify-title">' + title + '</div>\n          <div class="notify-content">' + message + '</div>\n        </div>\n      ';

	    notifyItem.style.top = topValue + 'px';
	    notifyBox.append(notifyItem);
	    notifyItem.classList.add('enter');
	    setTimeout(function () {
	      notifyItem.classList.remove('enter');
	      notifyItem.classList.add('leave');
	      notifyItem.addEventListener('webkitAnimationEnd', function () {
	        notifyItem.remove();
	        updatePosition();
	      });
	    }, 3 * 1000);

	    // 点击关闭处理
	    // notifyItem.addEventListener('click', () => {
	    //   notifyItem.classList.remove('enter');
	    //   notifyItem.classList.add('leave');
	    //   notifyItem.addEventListener('webkitAnimationEnd', () => {
	    //     notifyItem.remove();
	    //     updatePosition();
	    //   });
	    // });
	  }
	};

	ui = Object.assign({}, notice);

	exports.default = notice;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var form = {
	  /**
	   * Switch 开关
	   * @param {DOM} target 开关组件所在父元素
	   * @param {Function} cb_success 开启后回调函数
	   * @param {Function} cb_fail 关闭后回调函数
	   */

	  switch: function _switch(target, cb_success, cb_fail) {
	    var switchWrapper = document.createElement('div');
	    switchWrapper.classList.add('switch-wrapper');
	    switchWrapper.classList.add('cancel');

	    switchWrapper.innerHTML = '<div class="circle circle-cancel"></div>';
	    switchWrapper.addEventListener('click', function () {
	      console.log(this);
	      var circle = this.querySelector('.circle');
	      if (circle.classList.contains('circle-cancel')) {
	        this.className = 'switch-wrapper confirm';
	        circle.className = 'circle circle-confirm';
	      } else {
	        this.className = 'switch-wrapper cancel';
	        circle.className = 'circle circle-cancel';
	      }
	    });

	    document.body.appendChild(switchWrapper);
	  }
	};

	exports.default = form;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/.0.26.2@css-loader/index.js!./notice.css", function() {
				var newContent = require("!!../../../node_modules/.0.26.2@css-loader/index.js!./notice.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	exports.i(__webpack_require__(25), "");
	exports.i(__webpack_require__(26), "");
	exports.i(__webpack_require__(27), "");
	exports.i(__webpack_require__(28), "");
	exports.i(__webpack_require__(29), "");

	// module
	exports.push([module.id, "/*@import url(\"./basic.css\");*/\n", ""]);

	// exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*loading*/\n.loading-wrapper{\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.loading-mask{\n  width: 100%;\n  height: 100%;\n  background-color: #333;\n  opacity: .9;\n  background-color: #fff;\n}\n\n.loading-text{\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n  color: #8a8a8a;\n}\n\n.icon-loading{\n  background-image: url(" + __webpack_require__(5) + ");\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  animation: rotate 3s infinite linear;\n}\n\n@keyframes rotate{\n  0%{\n    transform: rotate(0deg);\n  }\n  100%{\n    transform: rotate(360deg);\n  }\n}\n\n.loading-text-detail{\n  /*display: block;*/\n}\n", ""]);

	// exports


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*alert*/\n.alert-box{\n  position: fixed;\n  top: 20px;\n  left: 20px;\n  right: 20px;\n}\n\n.alert-wrapper{\n  box-sizing: border-box;\n  width: 100%;\n  height: 36px;\n  padding: 8px 16px;\n  line-height: 20px;\n  color: #fff;\n  border-radius: 4px;\n  transition: all .5s ease-in-out;\n  opacity: 1;\n  margin-bottom: 10px;\n}\n\n.alert-wrapper-hide{\n  opacity: 0;\n}\n\n.alert-success{\n  background-color: #13ce66;\n}\n\n.alert-info{\n  background-color: #50bfff;\n}\n\n.alert-warning{\n  background-color: #f7ba2a;\n}\n\n.alert-error{\n  background-color: #ff4949;\n}\n\n.alert-title{\n  padding: 0 8px;\n  font-size: 16px;\n}\n\n.close-text{\n  float: right;\n  font-size: 12px;\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".toast-wrapper{\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 120px;\n  height: 120px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #515151;\n  color: #fff;\n  border-radius: 10px;\n  opacity: 0;\n  animation: toast 1.5s ease-in-out;\n}\n\n/*.toast-wrapper-leave{\n  opacity: 1;\n  animation: toast-leave\n}*/\n\n@keyframes toast {\n  from{ opacity: 0; }\n  30% { opacity: 1; }\n  70% { opacity: 1; }\n  to { opacity: 0; }\n}\n\n.icon{\n  margin-bottom: 5px;\n  width: 32px;\n  height: 32px;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n\n.icon-success{\n  background-image: url(" + __webpack_require__(8) + ");\n}\n\n.icon-error{\n  background-image: url(" + __webpack_require__(9) + ");\n}\n\n.icon-loading{\n  background-image: url(" + __webpack_require__(10) + ");\n}\n", ""]);

	// exports


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".message-box-wrapper{\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.message-box-wrapper .message-box-mask{\n  width: 100%;\n  height: 100%;\n  position: relative;\n  z-index: 1000;\n  background-color: #000;\n  opacity: 0.3;\n}\n\n.message-box-wrapper .message-box-mask.hide{\n  display: none;\n}\n\n.message-box-wrapper .message-box-container{\n  width: 360px;\n  padding: 20px;\n  position: absolute;\n  z-index: 1001;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n  transition: all .3s linear;\n}\n\n.message-box-wrapper .message-box-container.enter{\n  animation: message-box-show 0.3s ease;\n}\n\n.message-box-wrapper .message-box-container.leave{\n  animation: message-box-hide 0.3s ease;\n  opacity: 0;\n}\n\n@keyframes message-box-show{\n  from{\n    opacity: 0;\n    margin-top: -10px;\n  }\n  to{\n    opacity: 1;\n    margin-top: 0;\n  }\n}\n\n@keyframes message-box-hide{\n  from{\n    opacity: 1;\n    margin-top: 0;\n  }\n  to{\n    opacity: 0;\n    margin-top: -10px;\n  }\n}\n\n.message-box-container .message-title{\n  font-size: 16px;\n  color: #333;\n  font-weight: 700;\n}\n\n.message-box-container .message-content{\n  font-size: 14px;\n  color: #48576a;\n  padding: 30px 0;\n}\n\n.message-box-container .message-operation{\n  display: flex;\n  justify-content: flex-end;\n}\n\n.message-box-container .message-operation .btn-cancel{\n  margin-right: 10px;\n}\n", ""]);

	// exports


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".notify-box{\n  position: fixed;\n  right: 10px;\n  top: 10px;\n  width: 330px;\n}\n\n.notify-item{\n  position: fixed;\n  width: 330px;\n  /*width: 100%;*/\n  /*height: 90px;*/\n  margin-bottom: 10px;\n  padding: 20px;\n  box-sizing: border-box;\n  background-color: #fff;\n  border: 1px solid #f8f8f8;\n  box-shadow: 0 0 5px #ccc;\n  transition: all 0.3s ease;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.notify-desc{\n  margin-left: 10px;\n}\n\n.notify-item .notify-title{\n  font-weight: 400;\n  color: #1f2d3d;\n  font-size: 16px;\n}\n\n.notify-item .notify-content{\n  color: #8391a5;\n  margin: 10px 0 0;\n  font-size: 14px;\n  line-height: 21px;\n}\n\n.notify-item.enter{\n  animation: .3s notify-enter ease;\n}\n\n.notify-item.leave{\n  animation: .3s notify-leave ease;\n}\n\n@keyframes notify-enter {\n  from{\n    margin-left: calc(100% + 15px);\n  }\n\n  to{\n    margin-left: 0;\n  }\n}\n\n@keyframes notify-leave {\n  from{\n    margin-left: 0;\n  }\n  to{\n    margin-left: calc(100% + 15px);\n    display: none;\n  }\n}\n\n.icon{\n  display: block;\n  width: 40px;\n  height: 40px;\n}\n\n.success-icon{\n  background-image: url(" + __webpack_require__(13) + ");\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n\n.info-icon{\n  background-image: url(" + __webpack_require__(14) + ");\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n\n.warning-icon{\n  background-image: url(" + __webpack_require__(15) + ");\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n\n.error-icon{\n  background-image: url(" + __webpack_require__(16) + ");\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n}\n", ""]);

	// exports


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/.0.26.2@css-loader/index.js!./form.css", function() {
				var newContent = require("!!../../../node_modules/.0.26.2@css-loader/index.js!./form.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	exports.i(__webpack_require__(32), "");

	// module
	exports.push([module.id, "\n", ""]);

	// exports


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".switch-wrapper{\n  height: 32px;\n  width: 64px;\n  /*border: 1px solid #000;*/\n  border-radius: 16px;\n  box-sizing: content-box;\n  position: relative;\n  transition: all 0.5s ease-in-out;\n}\n\n.switch-wrapper.confirm{\n  background-color: #20a0ff;\n}\n\n.switch-wrapper.cancel{\n  background-color: #bfcbd9;\n}\n\n.switch-wrapper .circle{\n  width: 28px;\n  background-color: #fff;\n  border-radius: 50%;\n  background-color: #fff;\n  transition: all .5s ease-in-out;\n  position: absolute;\n  top: 2px;\n  bottom: 2px;\n}\n\n.switch-wrapper .circle-confirm{\n  /*position: absolute;*/\n  left: 34px;\n  /*top: 1px;*/\n}\n\n.switch-wrapper .circle-cancel{\n  /*position: absolute;*/\n  left: 2px;\n  /*top: 1px;*/\n}\n", ""]);

	// exports


/***/ }
/******/ ]);