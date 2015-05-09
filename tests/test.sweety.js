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
      $.should.be.ok;
    });

    it('should select by id', function () {
      $('#sweety_test').toArray().should.have.lengthOf(1);
    });

    it('should select by class', function () {
      $('.sweety-test').toArray().should.have.lengthOf(1);
    });

    it('should select by tag', function () {
      $('div').toArray().length.should.not.be.eql(0);
    });

    it('should create a DOM elements by html', function () {
      $('<div>').toArray().should.have.lengthOf(1);
    });

    it('should properly handle window', function () {
      $(window).toArray()[0].toString().should.be.eql(window.toString());
    });

    it('should properly handle document', function () {
      $(document).toArray()[0].should.be.eql(document);
    });

    it('should properly handle SweetyElement', function () {
      $($(document)).toArray()[0].should.be.eql(document);
    });

    it('should select nothing by empty string', function () {
      $('').toArray().should.have.lengthOf(0);
    });

    it('should return empty collection without any params', function () {
      $().toArray().should.have.lengthOf(0);
    });

  });

  describe('.toArray', function () {

    it('should return an Array', function () {
      $('#sweety_test').toArray().should.be.an.Array;
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
      $('#sweety_test').findChild('div').toArray().should.have.lengthOf(1);
    });

    it('should return a child element by class', function () {
      $('#sweety_test').findChild('.sweety-test-child').toArray().should.have.lengthOf(1);
    });

    it('should return empty collection on empty collection', function () {
      $().findChild('.sweety-test-child').toArray().should.have.lengthOf(0);
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
      $('#sweety_test_child').findParent().toArray().should.have.lengthOf(1);
    });

    it('should return a parent element by tag', function () {
      $('#sweety_test_child').findParent('div').toArray().should.have.lengthOf(1);
    });

    it('should return a parent element by class', function () {
      $('#sweety_test_child').findParent('.sweety-test').toArray().should.have.lengthOf(1);
    });

    it('should return empty collection on empty collection', function () {
      $().findParent('.sweety-test').toArray().should.have.lengthOf(0);
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
      $('#sweety_test_child').parent().toArray().should.have.lengthOf(1);
    });

    it('should return empty collection on empty collection', function () {
      $().parent().toArray().should.have.lengthOf(0);
    });

  });

  describe('.getProp', function () {
    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value of given property', function () {
      var input = '<input id="sweety_test_input" type="text" value="test-value">';
      document.getElementById('sweety_test').innerHTML = input;
      $('#sweety_test_input').getProp('value').should.be.eql('test-value');
      $('#sweety_test_input').getProp('type').should.be.eql('text');
    });

    it('should return true if property checked exists', function () {
      var input = '<input id="sweety_test_input" type="checkbox" checked="">';
      document.getElementById('sweety_test').innerHTML = input;
      $('#sweety_test_input').getProp('checked').should.be.true;
    });

    it('should return false if property checked does not exists', function () {
      var input = '<input id="sweety_test_input" type="checkbox">';
      document.getElementById('sweety_test').innerHTML = input;
      $('#sweety_test_input').getProp('checked').should.be.false;
    });

    it('should return undefined if property does not exists', function () {
      var input = '<input id="sweety_test_input">';
      document.getElementById('sweety_test').innerHTML = input;
      ($('#sweety_test_input').getProp('notexists') === undefined).should.be.true;
    });

    it('should return undefined if element does not exists', function () {
      ($().getProp('notexists') === undefined).should.be.true;
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
      document.getElementById('sweety_test_input').value.should.be.eql('test-value');
      document.getElementById('sweety_test_input').type.should.be.eql('text');
    });

    it('should set a given property and value from an object', function () {
      $('#sweety_test_input')
        .setProp({
          'value': 'test-value',
          'type': 'text'
        });
      document.getElementById('sweety_test_input').value.should.be.eql('test-value');
      document.getElementById('sweety_test_input').type.should.be.eql('text');
    });

    it('should set a checked property', function () {
      $('#sweety_test_input')
        .setProp('type', 'checkbox')
        .setProp('checked', true);
      document.getElementById('sweety_test_input').checked.should.be.true;
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
      $('#sweety_test_input').prop('value').should.be.eql('test-value');
      $('#sweety_test_input').prop('type').should.be.eql('text');
    });

    it('should set a given property and value from a pair', function () {
      $('#sweety_test_input')
        .prop('value', 'test-value')
        .prop('type', 'text');
      document.getElementById('sweety_test_input').value.should.be.eql('test-value');
      document.getElementById('sweety_test_input').type.should.be.eql('text');
    });

    it('should set a given property and value from an object', function () {
      $('#sweety_test_input')
        .prop({
          'value': 'test-value',
          'type': 'text'
        });
      document.getElementById('sweety_test_input').value.should.be.eql('test-value');
      document.getElementById('sweety_test_input').type.should.be.eql('text');
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
      $('#sweety_test_child').getAttr('test-attr').should.be.eql('test-value');
    });

    it('should return null if attr does not exists', function () {
      ($('#sweety_test_child').getAttr('test-attr-2') === null).should.be.true;
    });

    it('should return null if element does not exist', function () {
      ($().getAttr('test-attr') === null).should.be.true;
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
      $('#sweety_test_child')
        .setAttr('test-attr', 'test-value')
        .getAttr('test-attr').should.be.eql('test-value');
    });

    it('should set a given attr and value from an object', function () {
      $('#sweety_test_child')
        .setAttr({
          'test-attr': 'test-value'
        })
        .getAttr('test-attr').should.be.eql('test-value');
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
      ($('#sweety_test_child').removeAttr('test-attr').getAttr('test-attr') === null).should.be.true;
    });

    it('should remove a given attr by list of names from an array', function () {
      ($('#sweety_test_child').removeAttr(['test-attr']).getAttr('test-attr') === null).should.be.true;
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
      $('#sweety_test_child').hasAttr('test-attr').should.be.true;
    });

    it('should return false if attr doesn\'t exist', function () {
      $('#sweety_test_child').hasAttr('not-exist').should.be.false;
    });

    it('should return false if element does not exist', function () {
      $().hasAttr('test-attr').should.be.false;
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
      $('#sweety_test_child').attr('test-attr').should.be.eql('test-value');
    });

    it('should set a value if both key and value is specified', function () {
      $('#sweety_test_child')
        .attr('test-attr', 'new-test-value')
        .attr('test-attr')
        .should.be.eql('new-test-value');
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
      $('#sweety_test_child').val().should.be.eql('test-value');
    });

    it('should return a value if value set from attribute', function () {
      document.getElementById('sweety_test_child').setAttribute('value', 'test-value');
      $('#sweety_test_child').val().should.be.eql('test-value');
    });

    it('should set a value if value is specified', function () {
      $('#sweety_test_child').val('new-test-value').val()
        .should.be.eql('new-test-value');
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
      $('#sweety_test_child').val().should.be.eql('value-1');
    });

    it('should return value set using property', function () {
      document.getElementById('sweety_test_child').value = 'value-2';
      $('#sweety_test_child').val().should.be.eql('value-2');
    });

    it('should change and return value', function () {
      $('#sweety_test_child').val('value-2').val().should.be.eql('value-2');
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
      $('#sweety_test_child').val().should.be.eql(['value-1']);
    });

    it('should return value set using property', function () {
      document.getElementById('sweety_test_child').value = 'value-2';
      $('#sweety_test_child').val().should.be.eql(['value-2']);
    });

    it('should change value on string', function () {
      $('#sweety_test_child').val('value-2 value-3').val().should.be.eql(['value-2', 'value-3']);
    });

    it('should change value on array', function () {
      $('#sweety_test_child').val(['value-2', 'value-3']).val().should.be.eql(['value-2', 'value-3']);
    });

    it('should deselect all on empty string', function () {
      ($('#sweety_test_child').val('').val() === null).should.be.true;
    });

    it('should deselect all on empty array', function () {
      ($('#sweety_test_child').val([]).val() === null).should.be.true;
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
      $('#sweety_test_child').val().should.be.eql('test-value');
    });

    it('should return a value if value set from attribute', function () {
      document.getElementById('sweety_test_child').setAttribute('value', 'test-value');
      $('#sweety_test_child').val().should.be.eql('test-value');
    });

    it('should set a value if value is specified', function () {
      $('#sweety_test_child').val('new-test-value').val()
        .should.be.eql('new-test-value');
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
      $.fn.getClasses($('#sweety_test_child').toArray()[0])
        .should.be.eql(['class-1', 'class-2', 'class-3']);
    });

    it('should return a blank array if no class is specified', function () {
      $.fn.getClasses($('#sweety_test_child2').toArray()[0])
        .should.be.eql([]);
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
      $('#sweety_test_child').attr('class').should.be.eql('class-1 class-2 class-3');
    });

    it('should set blank class from a blank array', function () {
      $.fn.saveClasses($('#sweety_test_child').toArray()[0], []);
      $('#sweety_test_child').attr('class').should.be.eql('');
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
      $.fn.getClasses($('#sweety_test_child').addClass('class-3').toArray()[0])
        .should.be.eql(['class-1', 'class-2', 'class-3']);
    });

    it('should add multiple classes from a string', function () {
      $.fn.getClasses($('#sweety_test_child').addClass('class-3 class-4').toArray()[0])
        .should.be.eql(['class-1', 'class-2', 'class-3', 'class-4']);
    });

    it('should add classes from a list', function () {
      $.fn.getClasses($('#sweety_test_child').addClass(['class-3', 'class-4']).toArray()[0])
        .should.be.eql(['class-1', 'class-2', 'class-3', 'class-4']);
    });

    it('should not duplicate classes when adding', function () {
      $.fn.getClasses($('#sweety_test_child').addClass(['class-1', 'class-2']).toArray()[0])
        .should.be.eql(['class-1', 'class-2']);
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
      $.fn.getClasses($('#sweety_test_child').removeClass('class-2').toArray()[0])
        .should.be.eql(['class-1']);
    });

    it('should remove multiple classes from a string', function () {
      $.fn.getClasses($('#sweety_test_child').removeClass('class-1 class-2').toArray()[0])
        .should.be.eql([]);
    });

    it('should remove classes from a list', function () {
      $.fn.getClasses($('#sweety_test_child').removeClass(['class-1', 'class-2']).toArray()[0])
        .should.be.eql([]);
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
      $('#sweety_test_child').hasClass('class-2').should.be.true;
    });

    it('should return false if first element doesn\'t have a given class', function () {
      $('#sweety_test_child').hasClass('no-such-class').should.be.false;
    });

    it('should return false if element does not exist', function () {
      $().hasClass('class-2').should.be.false;
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
      $('#sweety_test_child').toggleClass('new-class').hasClass('new-class').should.be.true;
      $('#sweety_test_child').toggleClass('new-class').hasClass('new-class').should.be.false;
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
      $.fn.getStyles($('#sweety_test_child').toArray()[0])
        .should.be.eql({ color: 'black' });
    });

    it('should return a blank object if no style is specified', function () {
      $.fn.getStyles($('#sweety_test_child2').toArray()[0])
        .should.be.eql({});
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
      document.getElementById('sweety_test_child').style.cssText.should.be.eql('color: black;');
    });

    it('should set blank styles from a blank object', function () {
      $.fn.saveStyles($('#sweety_test_child').toArray()[0], {});
      document.getElementById('sweety_test_child').style.cssText.should.be.eql('');
    });

  });

  describe('.addStyle', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.style.cssText = 'color: black;';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should add styles from arguments', function () {
      $('#sweety_test_child').addStyle('text-align', 'right');
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('color: black; text-align: right;');
    });

    it('should add styles from an object', function () {
      $('#sweety_test_child').addStyle({
        'text-align': 'right',
        'text-decoration': 'none'
      });
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('color: black; text-align: right; text-decoration: none;');
    });

    it('should not duplicate styles when adding', function () {
      $('#sweety_test_child').addStyle({
        color: 'black'
      });
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('color: black;');
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
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('text-align: right;');
    });

    it('should remove styles from a list', function () {
      $('#sweety_test_child').removeStyle(['color', 'text-align']);
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('');
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
      elem.style.cssText = 'color: black;';
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should add styles from arguments', function () {
      $('#sweety_test_child').css('text-align', 'right');
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('color: black; text-align: right;');
    });

    it('should add styles from an object', function () {
      $('#sweety_test_child').css({
        'text-align': 'right',
        'text-decoration': 'none'
      });
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('color: black; text-align: right; text-decoration: none;');
    });

    it('should not duplicate styles when adding', function () {
      $('#sweety_test_child').css({
        color: 'black'
      });
      document.getElementById('sweety_test_child').style.cssText
        .should.be.eql('color: black;');
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
      $('#sweety_test')
        .html()
        .should.be.eql('<div id="sweety_test_child"></div>');
    });

    it('should set inner HTML if string is provided', function () {
      $('#sweety_test')
        .html('<div id="sweety_test_child_2"></div>')
        .html()
        .should.be.eql('<div id="sweety_test_child_2"></div>');
    });

    it('setter should not crash on empty collection', function () {
      $().html('<div id="sweety_test_child_2"></div>');
    });

    it('getter should return undefined on empty collection', function () {
      ($().html() === undefined).should.be.true;
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
      $('#sweety_test')
        .empty()
        .html()
        .should.be.eql('');
    });

  });

  describe('.append', function () {

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should append elements', function () {
      $('#sweety_test').append($('<div id="sweety_test_child"></div>'));
      $('#sweety_test_child').toArray().should.have.lengthOf(1);
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
      $('#sweety_test_child').toArray().should.have.lengthOf(0);
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

    it('should bind events', function (done) {
      $('#sweety_test_child').on('click', function (e) {
        e.should.be.ok;
        done();
      });
      document.getElementById('sweety_test_child').dispatchEvent(new Event('click'));
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

    it('should unbind events', function (done) {
      var testFunc = function (e) {
        done(new Error('testFunc is binded'));
      };
      $('#sweety_test_child').on('click', testFunc);
      $('#sweety_test_child').off('click', testFunc);
      $('#sweety_test_child').on('click',function (e) {
        e.should.be.ok;
        done();
      });
      document.getElementById('sweety_test_child').dispatchEvent(new Event('click'));
    });

    it('should not crash on empty collection', function () {
      var testFunc = function () {};
      $().on('click', testFunc);
      $().off('click', testFunc);
    });

  });

  describe('.exists', function () {
    it('should return true if it does contain elements', function () {
      $('<div id="sweety_test_child"></div>').exists().should.be.true;
    });

    it('should return false if it doesn\'t contain any elements', function () {
      $().exists().should.be.false;
    });
  });

  describe('.toString', function () {
    it('should return [SweetyElement]', function () {
      $('<div id="sweety_test_child"></div>').toString().should.be.eql('[SweetyElement]');
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
    $().testFunc().should.be.eql(0);
    $('<div></div>').testFunc().should.be.eql(1);
  });
});
