define(['./jquery.activator'], function ($) {

	/*
	 * TESTS
	 */

	describe("activator", function(){

		beforeEach(function(){
			//Setup required dom elements
			$container = $('<div>', {id:'container'});
			$button = $('<button>', {id:'button'});
			$target = $('<div>', {id:'target'});

			$container.append([
				$button,
				$target
			]);

			setFixtures($container);
		});

		it("should toggle the class 'is-active' on the target", function(){
			$('#button').activator({
				target: '#target'
			});

			expect($target).not.toHaveClass('is-active');

			$button.click();

			expect($target).toHaveClass('is-active');

			$button.click();

			expect($target).not.toHaveClass('is-active');
		});

		it("should toggle the class 'is-active' on array of targets", function(){
			$('#button').activator({
				target: ['#target', 'body']
			});

			var $body = $('body');

			expect($target).not.toHaveClass('is-active');
			expect($body).not.toHaveClass('is-active');

			$button.click();

			expect($target).toHaveClass('is-active');
			expect($body).toHaveClass('is-active');

			$button.click();

			expect($target).not.toHaveClass('is-active');
			expect($body).not.toHaveClass('is-active');
		});

		it("should toggle the user set activeClass", function(){
			$('#button').activator({
				target: '#target',
				activeClass: 'custom-class'
			});

			expect($target).not.toHaveClass('custom-class');

			$button.click();

			expect($target).toHaveClass('custom-class');

			$button.click();

			expect($target).not.toHaveClass('custom-class');
		});

		it("should toggle different active classes for different targets when the user sends object", function(){
			$('#button').activator({
				target: {
					'#target': 'is-active-1',
					'body': 'is-active-2'
				}
			});

			var $body = $('body');

			expect($target).not.toHaveClass('is-active-1');
			expect($body).not.toHaveClass('is-active-2');

			$button.click();

			expect($target).toHaveClass('is-active-1');
			expect($body).toHaveClass('is-active-2');

			$button.click();

			expect($target).not.toHaveClass('is-active-1');
			expect($body).not.toHaveClass('is-active-2');
		});

	});

});