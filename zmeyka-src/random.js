function isInteger(n) {
	return n === +n && n === (n | 0);
}

function getRandomInt(max, min) {
	if (!isInteger(max))
		return;
	if (!isInteger(min))
		return getRandomInt(max, 0);
	if (max < min)
		return undefined;

	var rnd = Math.random();

	return ((rnd * (max - min)) | 0) + min;
}
