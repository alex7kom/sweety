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
      $('#sweety_test').toArray().length.should.be.eql(1);
    });

    it('should select by class', function () {
      $('.sweety-test').toArray().length.should.be.eql(1);
    });

    it('should select by tag', function () {
      $('div').toArray().length.should.not.be.eql(0);
    });

    it('should create a DOM elements by html', function () {
      $('<div>').toArray().length.should.be.eql(1);
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
      $('#sweety_test').findChild('div').toArray().length.should.be.eql(1);
    });

    it('should return a child element by class', function () {
      $('#sweety_test').findChild('.sweety-test-child').toArray().length.should.be.eql(1);
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
      $('#sweety_test_child').findParent().toArray().length.should.be.eql(1);
    });

    it('should return a parent element by tag', function () {
      $('#sweety_test_child').findParent('div').toArray().length.should.be.eql(1);
    });

    it('should return a parent element by class', function () {
      $('#sweety_test_child').findParent('.sweety-test').toArray().length.should.be.eql(1);
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
      $('#sweety_test_child').parent().toArray().length.should.be.eql(1);
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

    it('should remove a given attr', function () {
      ($('#sweety_test_child').removeAttr('test-attr').getAttr('test-attr') === null).should.be.true;
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

  describe('.val', function () {

    beforeEach(function () {
      var elem = document.createElement('div');
      elem.id = 'sweety_test_child';
      elem.setAttribute('value', 'test-value');
      document.getElementById('sweety_test').appendChild(elem);
    });

    afterEach(function () {
      document.getElementById('sweety_test').innerHTML = '';
    });

    it('should return a value with if value is not specified', function () {
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
      $('#sweety_test_child').toArray().length.should.be.eql(1);
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
      $('#sweety_test_child').toArray().length.should.be.eql(0);
    });
  });

  describe('.toString', function () {
    it('should return [SweetyElement]', function () {
      $('<div id="sweety_test_child"></div>').toString().should.be.eql('[SweetyElement]');
    });
  });

});
