<h1> Chart-It</h1>
<h2> What it is</h2>
<p>
	Chart-It is an tool written in javascript and jQuery to help web developers easily create elegant and fully-customizable charts.</br>
	It is still in its early developmental stage, and lots of features wil be added later.</br>
	It is created by <a href="http://www.bonghyunkim.com/">Bonghyun Kim</a>.
</p>
<h2> How to use Chart-It</h2>
<h3> Setting Up </h3>
<p>
	To use Chart-It, simply download both (1)Chart-It.js and (2) jq.js [Minified jQuery]
</p>
<p>
	Add Chart-It.js and jq.js in your html file.
</p>
<p>
	In any part of your site, add a div with id = "poll-creator". This div will automatically be hidden.
</p>
<p>
 	Add a canvas element with id = "poll-display". Customize the height and width with width and height tags.
</p>
<h3> Creating Title </h3>
<p>
	In your div with id = "poll-creator", type in <code>#title : Title;</code>
</p>
<h3> Customizing Colors</h3>
<p>
	Color variables can be added with <code>#color : red blue green;</code>
</p>
<p>
	Colors can be web-safe color names or hex codes.
</p>
<h3> Inputing chart variables </h3>
<p>
	Chart variables are written in the format <code>$name:number;</code>
</p>
<p>
	Ex. <code> $Java: 49; $C: 50; </code>
</p>
<h2> Example </h2>
<p>
Example can be found in 	sample-chart-it.html
</p>
