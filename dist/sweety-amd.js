/**
 * sweety - Small and simple DOM manipulation library
 * @version v1.5.0
 * @author Alexey Komarov <alex7kom@gmail.com>
 * @link https://github.com/Alex7Kom/sweety
 * @license MIT
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Sweety = factory();
  }
}(this, function() {
function Sweety() {

    var sweety = function(element) {
        return new SweetyElement(element);
    };

    var SweetyElement = function(element) {
        var elem;
        if (typeof element === 'string' && element.length > 0) {
            if (element.substr(0, 1) === '<') {
                elem = fn.create(element);
            } else {
                elem = fn.find(document, element);
            }
        } else if (typeof element === 'object' && element !== null) {
            elem = element;
        }
        this.elements = [];
        var type = Object.prototype.toString.call(elem);
        if (elem) {
            if (
                type === '[object HTMLCollection]' ||
                type === '[object NodeList]'
            ) {
                this.elements = Array.prototype.slice.call(elem);
            } else if (
                type === '[object Array]'
            ) {
                this.elements = elem;
            } else if (
                elem.toString() === '[SweetyElement]'
            ) {
                this.elements = elem.elements;
            } else {
                this.elements = [elem];
            }
        }
        return this;
    };

    var fn = sweety.fn = {

        create: function (html) {
            var a = document.createElement('div');
            a.innerHTML = html;
            return a.children;
        },

        find: function (parent, selector) {
            var elem;
            switch (selector.substr(0, 1)) {
                case '.':
                    elem = parent.getElementsByClassName(selector.substr(1));
                    break;
                case '#':
                    elem = parent.getElementById(selector.substr(1));
                    break;
                case '@':
                    elem = parent.getElementsByName(selector.substr(1));
                    break;
                default:
                    elem = parent.getElementsByTagName(selector);
            }
            return elem;
        },

        each: function (elems, cb) {
            for (var i = 0, l = elems.length; i < l; i++) {
                cb(elems[i], i, elems);
            }
        },

        objEach: function (elems, cb) {
            for (var i in elems) {
                if (elems.hasOwnProperty(i)) {
                    cb(i, elems[i]);
                }
            }
        },

        contains: function (subject, search) {
            return subject.indexOf(search) !== -1;
        },

        getClasses: function (elem) {
            if (elem.className === '') {
                return [];
            }
            return elem.className.split(/\s+/);
        },
        saveClasses: function (elem, elemClasses) {
            elem.className = elemClasses.join(' ');
        },

        getStyles: function (elem) {
            var styles = elem.style.cssText.split(/;\s*/);
            var stylesObject = {};
            this.each(styles, function (item) {
                var pair = item.split(/:\s*/);
                if (pair.length !== 2) {
                    return;
                }
                stylesObject[pair[0]] = pair[1];
            });
            return stylesObject;
        },
        saveStyles: function (elem, stylesObject) {
            var stylesArray = [];
            this.objEach(stylesObject, function (styleName, styleValue) {
                stylesArray.push(styleName + ':' + styleValue);
            });
            elem.style.cssText = stylesArray.join(';');
        }

    };

    SweetyElement.prototype = {

        toArray: function () {
            return this.elements;
        },

        findChild: function (selector) {
            if (!this.elements[0]) {
                return sweety();
            }
            return sweety(fn.find(this.elements[0], selector));
        },
        findParent: function (selector) {
            if (!this.elements[0]) {
                return sweety();
            }
            var elem = this.elements[0];
            if (!selector) {
                return this.parent();
            }
            if (selector.substr(0,1) === '.') {
                do {
                    elem = elem.parentElement;
                } while (
                    !fn.contains(fn.getClasses(elem), selector.substr(1))
                );
            } else {
                do {
                    elem = elem.parentElement;
                } while (
                    !(elem.tagName.toUpperCase() === selector.toUpperCase())
                );
            }
            return sweety(elem);
        },
        parent: function () {
            if (!this.elements[0]) {
                return sweety();
            }
            return sweety(this.elements[0].parentElement);
        },

        forEach: function (cb) {
            fn.each(this.elements, cb);
            return this;
        },

        getProp: function (key) {
            if (!this.elements[0]) {
                return undefined;
            }
            return this.elements[0][key];
        },
        setProp: function (key, value) {
            var properties = {};
            if (typeof key === 'object') {
                properties = key;
            } else {
                properties[key] = value;
            }
            this.forEach(function (elem) {
                fn.objEach(properties, function (key, value) {
                    elem[key] = value;
                });
            });
            return this;
        },
        prop: function (key, value) {
            if (
                typeof value !== 'undefined'
                || typeof key === 'object'
            ) {
                return this.setProp(key, value);
            }
            return this.getProp(key);
        },

        getAttr: function (key) {
            if (!this.elements[0]) {
                return null;
            }
            return this.elements[0].getAttribute(key);
        },
        setAttr: function (key, value) {
            var attributes = {};
            if (key.toString() === '[object Object]') {
                attributes = key;
            } else {
                attributes[key] = value;
            }
            this.forEach(function (elem) {
                fn.objEach(attributes, function (key, value) {
                    elem.setAttribute(key, value);
                });
            });
            return this;
        },
        removeAttr: function (key) {
            var attributes = [];
            if (typeof key === 'object') {
                attributes = key;
            } else {
                attributes.push(key);
            }
            this.forEach(function (elem) {
                fn.each(attributes, function(key) {
                    elem.removeAttribute(key);
                });
            });
            return this;
        },
        hasAttr: function (key) {
            if (!this.elements[0]) {
                return false;
            }
            return this.elements[0].hasAttribute(key);
        },
        attr: function (key, value) {
            if (
                typeof value !== 'undefined'
                || typeof key === 'object'
            ) {
                this.setAttr(key, value);
                return this;
            }
            return this.getAttr(key);
        },

        val: function (value) {
            var result;
            if (this.elements[0] &&
                this.elements[0].tagName === 'SELECT' &&
                this.elements[0].multiple
            ) {
                if (typeof value !== 'undefined') {
                    if (typeof value === 'string') {
                        value = value.split(' ');
                    }
                    this.findChild('option').forEach(function (elem) {
                        if (fn.contains(value, elem.value)) {
                            elem.selected = true;
                        } else {
                            elem.selected = false;
                        }
                    });
                    return this;
                } else {
                    result = [];
                    this.findChild('option').forEach(function (elem) {
                        if (elem.selected) {
                            result.push(elem.value);
                        }
                    });
                    return result.length > 0 ? result : null;
                }
            }

            if (this.elements[0] &&
                this.elements[0].tagName === 'INPUT' &&
                this.elements[0].type === 'radio') {
                if (typeof value !== 'undefined') {
                    this.forEach(function (elem) {
                        if (elem.value === value) {
                            elem.checked = true;
                        } else {
                            elem.checked = false;
                        }
                    });
                    return this;
                } else {
                    result = null;
                    this.forEach(function (elem) {
                        if (elem.checked) {
                            result = elem.value;
                        }
                    });
                    return result;
                }
            }

            if (this.elements[0] &&
                this.elements[0].tagName === 'INPUT' &&
                this.elements[0].type === 'checkbox') {
                if (typeof value !== 'undefined') {
                    if (typeof value === 'string') {
                        value = value.split(' ');
                    }
                    this.forEach(function (elem) {
                        if (fn.contains(value, elem.value)) {
                            elem.checked = true;
                        } else {
                            elem.checked = false;
                        }
                    });
                    return this;
                } else {
                    result = [];
                    this.forEach(function (elem) {
                        if (elem.checked) {
                            result.push(elem.value);
                        }
                    });
                    return result.length > 0 ? result : null;
                }
            }

            if (typeof this.prop('value') !== 'undefined') {
                return this.prop('value', value);
            }
            return this.attr('value', value);
        },

        addClass: function (classes) {
            if (typeof classes === 'string') {
                classes = classes.split(/\s+/);
            }

            this.forEach(function (elem) {
                var elemClasses = fn.getClasses(elem);
                fn.each(classes, function (className) {
                    if (elemClasses.indexOf(className) === -1) {
                        elemClasses.push(className);
                    }
                });
                fn.saveClasses(elem, elemClasses);
            });
            return this;
        },
        removeClass: function (classes) {
            if (typeof classes === 'string') {
                classes = classes.split(/\s+/);
            }

            this.forEach(function (elem) {
                var elemClasses = fn.getClasses(elem);
                fn.each(classes, function (className) {
                    var index = elemClasses.indexOf(className);
                    if (index !== -1) {
                        elemClasses.splice(index, 1);
                    }
                });
                fn.saveClasses(elem, elemClasses);
            });
            return this;
        },
        hasClass: function (className) {
            if (!this.elements[0]) {
                return false;
            }
            return fn.contains(fn.getClasses(this.elements[0]), className);
        },
        toggleClass: function (className) {
            if (this.hasClass(className)) {
                this.removeClass(className);
            } else {
                this.addClass(className);
            }
            return this;
        },

        addStyle: function (style, styleValue) {
            this.forEach(function (elem) {
                var styles = fn.getStyles(elem);
                if (typeof styleValue !== 'undefined') {
                    styles[style] = styleValue;
                } else if (typeof style === 'object') {
                    fn.objEach(style, function (styleName, styleValue) {
                        styles[styleName] = styleValue;
                    });
                }
                fn.saveStyles(elem, styles);
            });
            return this;
        },
        removeStyle: function (style) {
            if (typeof style === 'string') {
                style = [style];
            }
            this.forEach(function (elem) {
                var styles = fn.getStyles(elem);
                fn.each(style, function (styleItem) {
                    delete styles[styleItem];
                });
                fn.saveStyles(elem, styles);
            });
            return this;
        },
        css: function (style, styleValue) {
            return this.addStyle(style, styleValue);
        },

        html: function (html) {
            if (typeof html !== 'undefined') {
                this
                    .empty()
                    .forEach(function (elem) {
                        elem.innerHTML = html;
                    });
                return this;
            }
            if (!this.elements[0]) {
                return undefined;
            }
            return this.elements[0].innerHTML;
        },
        empty: function () {
            this.forEach(function (elem) {
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            });
            return this;
        },

        append: function (elem) {
            if (!this.elements[0] || !elem) {
                return this;
            }
            if (elem.toString() === '[SweetyElement]') {
                fn.each(elem.elements, function (item) {
                    this.elements[0].appendChild(item);
                }.bind(this));
            } else {
                this.elements[0].appendChild(elem);
            }
            return this;
        },
        remove: function () {
            this.forEach(function (elem) {
                elem.parentNode.removeChild(elem);
            });
            this.elements = [];
        },

        on: function (events, cb) {
            if (typeof events === 'string') {
                events = events.split(' ');
            }
            fn.each(events, function (eventName) {
                this.forEach(function (elem) {
                    elem.addEventListener(eventName, cb, false);
                    elem.sweetyEvents = elem.sweetyEvents || {};
                    elem.sweetyEvents[eventName] =
                        elem.sweetyEvents[eventName] || [];
                    elem.sweetyEvents[eventName].push(cb);
                });
            }.bind(this));
            return this;
        },
        off: function (events, cb) {
            if (typeof events === 'string') {
                events = events.split(' ');
            }
            fn.each(events, function (eventName) {
                this.forEach(function (elem) {
                    if (cb) {
                        elem.removeEventListener(eventName, cb, false);
                    } else if (
                        elem.sweetyEvents
                        && elem.sweetyEvents[eventName]
                    ) {
                        elem.sweetyEvents[eventName].forEach(function (cb) {
                            elem.removeEventListener(eventName, cb, false);
                        });
                        elem.sweetyEvents[eventName] = [];
                    }
                });
            }.bind(this));
            return this;
        },

        exists: function () {
            if (this.elements.length === 0) {
                return false;
            }
            return true;
        },
        toString: function () {
            return '[SweetyElement]';
        }

    };

    fn.each(arguments, function (extension) {
        if (typeof extension === 'object') {
            fn.objEach(extension, function (name, func) {
                if (typeof func !== 'function') {
                    return;
                }
                SweetyElement.prototype[name] = func;
            });
        }
    });

    return sweety;
}

return Sweety;
}));
