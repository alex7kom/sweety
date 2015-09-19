describe('Sweety', function (){
  var $ = Sweety();

  beforeEach(function (){
    var elem = document.createElement('div');
    elem.id = 'sweety_test';
    elem.className = 'sweety-test';
    document.body.appendChild(elem);
  });

  afterEach(function () {
    var elem = document.getElementById('sweety_test');
    elem.parentNode.removeChild(elem);
  });

  describe('$', function (){

    it('should be initialized', function (){
      expect($).to.be.ok;
    });

    it('should select by id', function () {
      expect($('#sweety_test').toArray().length).to.be(1);
    });

    it('should select by class', function () {
      expect($('.sweety-test').toArray().length).to.be(1);
    });

    it('should select by name', function () {
      var elem = document.createElement('a');
      elem.name = 'sweety_test_name';
      document.body.appendChild(elem);

      expect($('@sweety_test_name').toArray().length).to.be(1);
    });

    it('should select by tag', function () {
      expect($('div').toArray().length).to.not.be(0);
    });

    it('should create a DOM elements by html', function () {
      expect($('<div>').toArray().length).to.be(1);
    });

    it('should properly handle window', function () {
      expect($(window).toArray()[0].toString()).to.be(window.toString());
    });

    it('should properly handle document', function () {
      expect($(document).toArray()[0]).to.be(document);
    });

    it('should properly handle Array', function () {
      expect($([document]).toArray()[0]).to.be(document);
    });

    it('should properly handle SweetyElement', function () {
      expect($($(document)).toArray()[0]).to.be(document);
    });

    it('should select nothing by empty string', function () {
      expect($('').toArray().length).to.be(0);
    });

    it('should return empty collection without any params', function () {
      expect($().toArray().length).to.be(0);
    });

  });

  describe('.toArray', function () {

    it('should return an Array', function () {
      expect($('#sweety_test').toArray()).to.be.an('array');
    });

  });

  describe('.findChild', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.className = 'sweety-test-child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a child element by tag', function () {
      expect($('#sweety_test').findChild('div').toArray().length).to.be(1);
    });

    it('should return a child element by class', function () {
      expect($('#sweety_test').findChild('.sweety-test-child').toArray().length).to.be(1);
    });

    it('should return empty collection on empty collection', function () {
      expect($().findChild('.sweety-test-child').toArray().length).to.be(0);
    });

  });

  describe('.findParent', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a parent element', function () {
      expect($('#sweety_test_child').findParent()
        .hasClass('sweety-test')).to.be(true);
    });

    it('should return a parent element by tag', function () {
      expect($('#sweety_test_child').findParent('div')
        .hasClass('sweety-test')).to.be(true);
    });

    it('should return a parent element by class', function () {
      expect($('#sweety_test_child').findParent('.sweety-test')
        .hasClass('sweety-test')).to.be(true);
    });

    it('should return empty collection on empty collection', function () {
      expect($().findParent('.sweety-test').toArray().length).to.be(0);
    });

  });

  describe('.parent', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a parent element', function () {
      expect($('#sweety_test_child').parent().toArray().length).to.be(1);
    });

    it('should return empty collection on empty collection', function () {
      expect($().parent().toArray().length).to.be(0);
    });

  });

  describe('.getProp', function () {
    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value of given property', function () {
      var input = '<input id="sweety_test_input" type="text" value="test-value">';
      document.getElementById('sweety_test').innerHTML = input;
      expect($('#sweety_test_input').getProp('value')).to.be('test-value');
      expect($('#sweety_test_input').getProp('type')).to.be('text');
    });

    it('should return true if property checked exists', function () {
      var input = '<input id="sweety_test_input" type="checkbox" checked="">';
      document.getElementById('sweety_test').innerHTML = input;
      expect($('#sweety_test_input').getProp('checked')).to.be(true);
    });

    it('should return false if property checked does not exists', function () {
      var input = '<input id="sweety_test_input" type="checkbox">';
      document.getElementById('sweety_test').innerHTML = input;
      expect($('#sweety_test_input').getProp('checked')).to.be(false);
    });

    it('should return undefined if property does not exists', function () {
      var input = '<input id="sweety_test_input">';
      document.getElementById('sweety_test').innerHTML = input;
      expect($('#sweety_test_input').getProp('notexists') === undefined).to.be(true);
    });

    it('should return undefined if element does not exists', function () {
      expect($().getProp('notexists') === undefined).to.be(true);
    });
  });

  describe('.setProp', function () {
    beforeEach(function () {
      var input = '<input id="sweety_test_input">';
      document.getElementById('sweety_test').innerHTML = input;
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should set a given property and value from a pair', function () {
      $('#sweety_test_input')
        .setProp('value', 'test-value')
        .setProp('type', 'text');
      expect(document.getElementById('sweety_test_input').value).to.be('test-value');
      expect(document.getElementById('sweety_test_input').type).to.be('text');
    });

    it('should set a given property and value from an object', function () {
      $('#sweety_test_input')
        .setProp({
          'value': 'test-value',
          'type': 'text'
        });
      expect(document.getElementById('sweety_test_input').value).to.be('test-value');
      expect(document.getElementById('sweety_test_input').type).to.be('text');
    });

    it('should set a checked property', function () {
      $('#sweety_test_input')
        .setProp('type', 'checkbox')
        .setProp('checked', true);
      expect(document.getElementById('sweety_test_input').checked).to.be(true);
    });

    it('should not crash on empty collection', function () {
      $().setProp('type', 'checkbox');
    });
  });

  describe('.prop', function () {
    beforeEach(function () {
      var input = '<input id="sweety_test_input">';
      document.getElementById('sweety_test').innerHTML = input;
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value of given property', function () {
      document.getElementById('sweety_test_input').type = 'text';
      document.getElementById('sweety_test_input').value = 'test-value';
      expect($('#sweety_test_input').prop('value')).to.be('test-value');
      expect($('#sweety_test_input').prop('type')).to.be('text');
    });

    it('should set a given property and value from a pair', function () {
      $('#sweety_test_input')
        .prop('value', 'test-value')
        .prop('type', 'text');
      expect(document.getElementById('sweety_test_input').value).to.be('test-value');
      expect(document.getElementById('sweety_test_input').type).to.be('text');
    });

    it('should set a given property and value from an object', function () {
      $('#sweety_test_input')
        .prop({
          'value': 'test-value',
          'type': 'text'
        });
      expect(document.getElementById('sweety_test_input').value).to.be('test-value');
      expect(document.getElementById('sweety_test_input').type).to.be('text');
    });

    it('should not crash on empty collection', function () {
      $().prop('type', 'checkbox');
    });
  });

  describe('.getAttr', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.setAttribute('test-attr', 'test-value');
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value of given attr', function () {
      expect($('#sweety_test_child').getAttr('test-attr')).to.be('test-value');
    });

    it('should return null if attr does not exists', function () {
      expect($('#sweety_test_child').getAttr('test-attr-2') === null).to.be(true);
    });

    it('should return null if element does not exist', function () {
      expect($().getAttr('test-attr') === null).to.be(true);
    });

  });

  describe('.setAttr', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should set a given attr and value from a pair of strings', function () {
      expect($('#sweety_test_child')
        .setAttr('test-attr', 'test-value')
        .getAttr('test-attr')).to.be('test-value');
    });

    it('should set a given attr and value from an object', function () {
      expect($('#sweety_test_child')
        .setAttr({
          'test-attr': 'test-value'
        })
        .getAttr('test-attr')).to.be('test-value');
    });

    it('should not crash on empty collection', function () {
      $().setAttr('test-attr', 'test-value');
      $().setAttr({
        'test-attr': 'test-value'
      });
    });

  });

  describe('.removeAttr', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.setAttribute('test-attr', 'test-value');
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should remove a given attr by name from a string', function () {
      expect($('#sweety_test_child').removeAttr('test-attr').getAttr('test-attr') === null).to.be(true);
    });

    it('should remove a given attr by list of names from an array', function () {
      expect($('#sweety_test_child').removeAttr(['test-attr']).getAttr('test-attr') === null).to.be(true);
    });

    it('should not crash on empty collection', function () {
      $().removeAttr('test-attr');
      $().removeAttr(['test-attr']);
    });

  });

  describe('.hasAttr', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.setAttribute('test-attr', 'test-value');
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return true if attr exists', function () {
      expect($('#sweety_test_child').hasAttr('test-attr')).to.be(true);
    });

    it('should return false if attr doesn\'t exist', function () {
      expect($('#sweety_test_child').hasAttr('not-exist')).to.be(false);
    });

    it('should return false if element does not exist', function () {
      expect($().hasAttr('test-attr')).to.be(false);
    });

  });

  describe('.attr', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.setAttribute('test-attr', 'test-value');
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value with if only key is specified', function () {
      expect($('#sweety_test_child').attr('test-attr')).to.be('test-value');
    });

    it('should set a value if both key and value is specified', function () {
      expect($('#sweety_test_child')
        .attr('test-attr', 'new-test-value')
        .attr('test-attr')
        ).to.be('new-test-value');
    });

  });

  describe('.val with input element', function () {

    beforeEach(function () {
      var elem = document.createElement('input');
      elem.type = 'text';
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value if value set from property', function () {
      document.getElementById('sweety_test_child').value = 'test-value';
      expect($('#sweety_test_child').val()).to.be('test-value');
    });

    it('should return a value if value set from attribute', function () {
      document.getElementById('sweety_test_child').setAttribute('value', 'test-value');
      expect($('#sweety_test_child').val()).to.be('test-value');
    });

    it('should set a value if value is specified', function () {
      expect($('#sweety_test_child').val('new-test-value').val()
        ).to.be('new-test-value');
    });

  });

  describe('.val with select element', function () {

    beforeEach(function () {
      document.getElementById('sweety_test').innerHTML = '<select id="sweety_test_child"><option value="value-1" selected="">Value 1</option><option value="value-2">Value 2</option></select>';
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return selected value', function () {
      expect($('#sweety_test_child').val()).to.be('value-1');
    });

    it('should return value set using property', function () {
      document.getElementById('sweety_test_child').value = 'value-2';
      expect($('#sweety_test_child').val()).to.be('value-2');
    });

    it('should change and return value', function () {
      expect($('#sweety_test_child').val('value-2').val()).to.be('value-2');
    });

  });

  describe('.val with multiple select element', function () {

    beforeEach(function () {
      document.getElementById('sweety_test').innerHTML = '<select id="sweety_test_child" multiple=""><option value="value-1" selected="">Value 1</option><option value="value-2">Value 2</option><option value="value-3">Value 3</option></select>';
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return selected value', function () {
      expect($('#sweety_test_child').val()).to.eql(['value-1']);
    });

    it('should return value set using property', function () {
      document.getElementById('sweety_test_child').value = 'value-2';
      expect($('#sweety_test_child').val()).to.eql(['value-2']);
    });

    it('should change value on string', function () {
      expect($('#sweety_test_child').val('value-2 value-3').val()).to.eql(['value-2', 'value-3']);
    });

    it('should change value on array', function () {
      expect($('#sweety_test_child').val(['value-2', 'value-3']).val()).to.eql(['value-2', 'value-3']);
    });

    it('should deselect all on empty string', function () {
      expect($('#sweety_test_child').val('').val() === null).to.be(true);
    });

    it('should deselect all on empty array', function () {
      expect($('#sweety_test_child').val([]).val() === null).to.be(true);
    });

  });

  describe('.val with radio buttons', function () {
    beforeEach(function () {
      document.getElementById('sweety_test').innerHTML = '<input type="radio" name="sweety_radio_button" value="value-1" checked=""><input type="radio" name="sweety_radio_button" value="value-2"><input type="radio" name="sweety_radio_button" value="value-3">';
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value of checked radio', function () {
      expect($('@sweety_radio_button').val()).to.be('value-1');
    });

    it('should change value', function () {
      expect($('@sweety_radio_button').val('value-2').val()).to.be('value-2');
    });

    it('should uncheck all on empty string', function () {
      expect($('@sweety_radio_button').val('').val() === null).to.be(true);
    });
  });

  describe('.val with checkboxes', function () {
    beforeEach(function () {
      document.getElementById('sweety_test').innerHTML = '<input type="checkbox" name="sweety_checkbox" value="value-1" checked=""><input type="checkbox" name="sweety_checkbox" value="value-2"><input type="checkbox" name="sweety_checkbox" value="value-3">';
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value of checked checkbox', function () {
      expect($('@sweety_checkbox').val()).to.eql(['value-1']);
    });

    it('should change value on string', function () {
      expect($('@sweety_checkbox').val('value-2').val()).to.eql(['value-2']);
    });

    it('should change value on array', function () {
      expect($('@sweety_checkbox').val(['value-2', 'value-3']).val()
        ).to.eql(['value-2', 'value-3']);
    });

    it('should uncheck all on empty string', function () {
      expect($('@sweety_checkbox').val('').val() === null).to.be(true);
    });

    it('should uncheck all on empty array', function () {
      expect($('@sweety_checkbox').val([]).val() === null).to.be(true);
    });
  });

  describe('.val with div element', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value if value set from property', function () {
      document.getElementById('sweety_test_child').value = 'test-value';
      expect($('#sweety_test_child').val()).to.be('test-value');
    });

    it('should return a value if value set from attribute', function () {
      document.getElementById('sweety_test_child').setAttribute('value', 'test-value');
      expect($('#sweety_test_child').val()).to.be('test-value');
    });

    it('should set a value if value is specified', function () {
      expect($('#sweety_test_child').val('new-test-value').val()
        ).to.be('new-test-value');
    });

  });

  describe('fn.getClasses', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.className = 'class-1 class-2 class-3';
      document.getElementById('sweety_test').appendChild(elem);
      var elem2 = document.createElement('div');
      elem2.id = 'sweety_test_child2';
      document.getElementById('sweety_test').appendChild(elem2);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return an array of classes', function () {
      expect($.fn.getClasses($('#sweety_test_child').toArray()[0])
        ).to.eql(['class-1', 'class-2', 'class-3']);
    });

    it('should return a blank array if no class is specified', function () {
      expect($.fn.getClasses($('#sweety_test_child2').toArray()[0])
        ).to.eql([]);
    });

  });

  describe('fn.saveClasses', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should set class from array', function () {
      $.fn.saveClasses($('#sweety_test_child').toArray()[0], ['class-1', 'class-2', 'class-3']);
      expect($('#sweety_test_child').attr('class')).to.be('class-1 class-2 class-3');
    });

    it('should set blank class from a blank array', function () {
      $.fn.saveClasses($('#sweety_test_child').toArray()[0], []);
      expect($('#sweety_test_child').attr('class')).to.be('');
    });

  });

  describe('.addClass', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.className = 'class-1 class-2';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should add class from a string', function () {
      expect($.fn.getClasses($('#sweety_test_child').addClass('class-3').toArray()[0])
        ).to.eql(['class-1', 'class-2', 'class-3']);
    });

    it('should add multiple classes from a string', function () {
      expect($.fn.getClasses($('#sweety_test_child').addClass('class-3 class-4').toArray()[0])
        ).to.eql(['class-1', 'class-2', 'class-3', 'class-4']);
    });

    it('should add classes from a list', function () {
      expect($.fn.getClasses($('#sweety_test_child').addClass(['class-3', 'class-4']).toArray()[0])
        ).to.eql(['class-1', 'class-2', 'class-3', 'class-4']);
    });

    it('should not duplicate classes when adding', function () {
      expect($.fn.getClasses($('#sweety_test_child').addClass(['class-1', 'class-2']).toArray()[0])
        ).to.eql(['class-1', 'class-2']);
    });

    it('should not crash on empty collection', function () {
      $().addClass('class-1');
      $().addClass(['class-1']);
    });

  });

  describe('.removeClass', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.className = 'class-1 class-2';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should remove class from a string', function () {
      expect($.fn.getClasses($('#sweety_test_child').removeClass('class-2').toArray()[0])
        ).to.eql(['class-1']);
    });

    it('should remove multiple classes from a string', function () {
      expect($.fn.getClasses($('#sweety_test_child').removeClass('class-1 class-2').toArray()[0])
        ).to.eql([]);
    });

    it('should remove classes from a list', function () {
      expect($.fn.getClasses($('#sweety_test_child').removeClass(['class-1', 'class-2']).toArray()[0])
        ).to.eql([]);
    });

    it('should not crash on empty collection', function () {
      $().removeClass('class-1');
      $().removeClass(['class-1']);
    });

  });

  describe('.hasClass', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.className = 'class-1 class-2';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return true if first element has a given class', function () {
      expect($('#sweety_test_child').hasClass('class-2')).to.be(true);
    });

    it('should return false if first element doesn\'t have a given class', function () {
      expect($('#sweety_test_child').hasClass('no-such-class')).to.be(false);
    });

    it('should return false if element does not exist', function () {
      expect($().hasClass('class-2')).to.be(false);
    });

  });

  describe('.toggleClass', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should toggle a given class on element', function () {
      expect($('#sweety_test_child').toggleClass('new-class').hasClass('new-class')).to.be(true);
      expect($('#sweety_test_child').toggleClass('new-class').hasClass('new-class')).to.be(false);
    });

  });

  describe('fn.getStyles', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.style.cssText = 'color: black;';
      document.getElementById('sweety_test').appendChild(elem);
      var elem2 = document.createElement('div');
      elem2.id = 'sweety_test_child2';
      document.getElementById('sweety_test').appendChild(elem2);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return an object of CSS styles', function () {
      expect($.fn.getStyles($('#sweety_test_child').toArray()[0])
        ).to.eql({ color: 'black' });
    });

    it('should return a blank object if no style is specified', function () {
      expect($.fn.getStyles($('#sweety_test_child2').toArray()[0])
        ).to.eql({});
    });

  });

  describe('fn.saveStyles', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should set styles from object', function () {
      $.fn.saveStyles($('#sweety_test_child').toArray()[0], { color: 'black' });
      expect(document.getElementById('sweety_test_child').style.color
        ).to.be('black');
    });

    it('should set blank styles from a blank object', function () {
      $.fn.saveStyles($('#sweety_test_child').toArray()[0], {});
      expect(document.getElementById('sweety_test_child').style.cssText
        ).to.be('');
    });

  });

  describe('.addStyle', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.style.cssText = 'color:black';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should add styles from arguments', function () {
      $('#sweety_test_child').addStyle('text-align', 'right');
      expect(document.getElementById('sweety_test_child').style.textAlign
        ).to.be('right');
    });

    it('should add styles from an object', function () {
      $('#sweety_test_child').addStyle({
        'text-align': 'right',
        'text-decoration': 'none'
      });
      expect(document.getElementById('sweety_test_child').style.textAlign
        ).to.be('right');
      expect(document.getElementById('sweety_test_child').style.textDecoration
        ).to.be('none');
    });

    it('should not duplicate styles when adding', function () {
      var prevCssText = document.getElementById('sweety_test_child').style.cssText;
      $('#sweety_test_child').addStyle({
        color: 'black'
      });
      expect(document.getElementById('sweety_test_child').style.cssText
        ).to.be(prevCssText);
    });

    it('should not crash on empty collection', function () {
      $().addStyle('color', 'black');
      $().addStyle({
        color: 'black'
      });
    });

  });

  describe('.removeStyle', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.style.cssText = 'color: black; text-align: right;';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should remove styles from arguments', function () {
      $('#sweety_test_child').removeStyle('color');
      expect(document.getElementById('sweety_test_child').style.color
        ).to.be('');
    });

    it('should remove styles from a list', function () {
      $('#sweety_test_child').removeStyle(['color', 'text-align']);
      expect(document.getElementById('sweety_test_child').style.cssText
        ).to.be('');
    });

    it('should not crash on empty collection', function () {
      $().removeStyle('color');
      $().removeStyle(['color']);
    });

  });

  describe('.css', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.style.cssText = 'color:black';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should add styles from arguments', function () {
      $('#sweety_test_child').css('text-align', 'right');
      expect(document.getElementById('sweety_test_child').style.textAlign
        ).to.be('right');
    });

    it('should add styles from an object', function () {
      $('#sweety_test_child').css({
        'text-align': 'right',
        'text-decoration': 'none'
      });
      expect(document.getElementById('sweety_test_child').style.textAlign
        ).to.be('right');
      expect(document.getElementById('sweety_test_child').style.textDecoration
        ).to.be('none');
    });

    it('should not duplicate styles when adding', function () {
      var prevCssText = document.getElementById('sweety_test_child').style.cssText;
      $('#sweety_test_child').css({
        color: 'black'
      });
      expect(document.getElementById('sweety_test_child').style.cssText
        ).to.be(prevCssText);
    });

  });

  describe('.html', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return inner HTML if no arguments are provided', function () {
      expect($('#sweety_test')
        .html()
        ).to.be('<div id="sweety_test_child"></div>');
    });

    it('should set inner HTML if string is provided', function () {
      expect($('#sweety_test')
        .html('<div id="sweety_test_child_2"></div>')
        .html()
        ).to.be('<div id="sweety_test_child_2"></div>');
    });

    it('setter should not crash on empty collection', function () {
      $().html('<div id="sweety_test_child_2"></div>');
    });

    it('getter should return undefined on empty collection', function () {
      expect($().html() === undefined).to.be(true);
    });

  });

  describe('.empty', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should empty inner HTML', function () {
      expect($('#sweety_test')
        .empty()
        .html()
        ).to.be('');
    });

  });

  describe('.append', function () {

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should append elements', function () {
      $('#sweety_test').append($('<div id="sweety_test_child"></div>'));
      expect($('#sweety_test_child').toArray().length).to.be(1);
    });

    it('should not crash on empty collection', function () {
      $().append($('<div id="sweety_test_child"></div>'));
    });

    it('should not crash if passed an empty collection', function () {
      $('#sweety_test').append();
      $('#sweety_test').append($());
    });

  });

  describe('.remove', function () {
    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should remove elements', function () {
      $('#sweety_test_child').remove();
      expect($('#sweety_test_child').toArray().length).to.be(0);
    });

    it('should not crash on empty collection', function () {
      $().remove();
    });

  });

  describe('.on', function () {
    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should bind events by string', function (done) {
      $('#sweety_test_child').on('click', function (e) {
        expect(e).to.be.ok();
        done();
      });
      document.getElementById('sweety_test_child').click();
    });

    it('should bind events by array', function (done) {
      $('#sweety_test_child').on(['click'], function (e) {
        expect(e).to.be.ok();
        done();
      });
      document.getElementById('sweety_test_child').click();
    });

    it('should not crash on empty collection', function () {
      $().on('click', function () {});
    });

  });

  describe('.off', function () {
    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should unbind events by string', function (done) {
      var testFunc = function (e) {
        done(new Error('testFunc is binded'));
      };
      $('#sweety_test_child').on('click', testFunc);
      $('#sweety_test_child').off('click', testFunc);
      $('#sweety_test_child').on('click',function (e) {
        expect(e).to.be.ok();
        done();
      });
      document.getElementById('sweety_test_child').click();
    });

    it('should unbind events by array', function (done) {
      var testFunc = function (e) {
        done(new Error('testFunc is binded'));
      };
      $('#sweety_test_child').on(['click'], testFunc);
      $('#sweety_test_child').off(['click'], testFunc);
      $('#sweety_test_child').on(['click'],function (e) {
        expect(e).to.be.ok();
        done();
      });
      document.getElementById('sweety_test_child').click();
    });

    it('should not crash on empty collection', function () {
      var testFunc = function () {};
      $().on('click', testFunc);
      $().off('click', testFunc);
    });

  });

  describe('.exists', function () {
    it('should return true if it does contain elements', function () {
      expect($('<div id="sweety_test_child"></div>').exists()).to.be(true);
    });

    it('should return false if it doesn\'t contain any elements', function () {
      expect($().exists()).to.be(false);
    });
  });

  describe('.toString', function () {
    it('should return [SweetyElement]', function () {
      expect($('<div id="sweety_test_child"></div>').toString()).to.be('[SweetyElement]');
    });
  });

});

describe('Extensions', function () {
  var $ = Sweety({
    testFunc: function () {
      return this.elements.length;
    }
  });

  it('testFunc should return collection length', function () {
    expect($().testFunc() === 0).to.be(true);
    expect($('<div></div>').testFunc() === 1).to.be(true);
  });
});
