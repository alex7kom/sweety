function Sweety(){

    var sweety = function(element){
        return new sweetyElement(element);
    };

    var sweetyElement = function(element) {
        var elem;
        if (typeof element == 'string' && element.length > 0) {
            if (element.substr(0, 1) == '<') {
                elem = fn.create(element);
            } else {
                elem = fn.find(document, element);
            }
        } else if (typeof element == 'object' && element !== null) {
            elem = element;
        }
        this.elements = [];
        if (elem) {
            if (elem.toString() == '[object HTMLCollection]') {
                this.elements = Array.prototype.slice.call(elem);
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

        contains: function (arr, item) {
            return arr.indexOf(item) !== -1;
        },

        getClasses: function (elem) {
            if (elem.className == '') {
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

    sweetyElement.prototype = {

        toArray: function () {
            return this.elements;
        },

        findChild: function (selector) {
            return sweety(fn.find(this.elements[0], selector));
        },
        findParent: function (selector) {
            var elem = this.elements[0];
            if (!selector) {
                return this.parent();
            }
            if (selector.substr(0,1) == '.') {
                while( (elem = elem.parentElement) && !fn.contains(fn.getClasses(elem), selector.substr(1)) );
            } else {
                while( (elem = elem.parentElement) && !(elem.tagName.toUpperCase() == selector.toUpperCase()));
            }
            return sweety(elem);
        },
        parent: function () {
            return sweety(this.elements[0].parentElement);
        },

        forEach: function(cb) {
            fn.each(this.elements, cb);
            return this;
        },

        getAttr: function (key) {
            return this.elements[0].getAttribute(key);
        },
        setAttr: function (key, value) {
            var attributes = {};
            if (key.toString() == '[object Object]') {
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
            if (typeof key == 'object') {
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
            return this.elements[0].hasAttribute(key);
        },
        attr: function (key, value) {
            if (value) {
                this.setAttr(key, value);
                return this;
            }
            return this.getAttr(key);
        },
        val: function (value) {
            return this.attr('value', value);
        },

        addClass: function (classes) {
            if (typeof classes == 'string') {
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
            if (typeof classes == 'string') {
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
                if (styleValue) {
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
            if (typeof style == 'string') {
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

        html: function (html) {
            if (html !== undefined) {
                this.forEach(function (elem) {
                    elem.innerHTML = html;
                });
                return this;
            }
            return this.elements[0].innerHTML;
        },
        empty: function () {
            this.html('');
            return this;
        },

        append: function (elem) {
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

        on: function () {
            this.forEach(function (elem) {
                elem.addEventListener(event, cb, false);
            });
            return this;
        },
        off: function () {
            this.forEach(function (elem) {
                elem.removeEventListener(event, cb, false);
            });
            return this;
        },

        toString: function () {
            return '[SweetyElement]';
        }

    };

    return sweety;
}
