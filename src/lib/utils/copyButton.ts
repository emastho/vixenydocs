export default function loadCopy() {
	document.querySelectorAll('pre').forEach(function (pre) {
		// Create the "Copy" button
		const button = document.createElement('button');
		button.innerText = 'Copy';
		button.className = 'copyButton';

		// Append the button to the code block container
		pre.appendChild(button);

		// Add click event to the button
		button.addEventListener('click', function () {
			// Get the code block content
			const code = pre.querySelector('code').innerText;

			// Use the Clipboard API to copy the code
			navigator.clipboard
				.writeText(code)
				.then(function () {
					// Change button text on successful copy
					button.innerText = 'Copied!';
					setTimeout(() => (button.innerText = 'Copy'), 1300);
				})
				.catch(function (err) {
					console.error('Could not copy text: ', err);
				});
		});
	});
}
