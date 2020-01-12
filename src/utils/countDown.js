const countDown = (diffTime, callback, endFn) => {
  var count = diffTime;
	var arr = [];
	var oldData = [];
	var nullNum = 0;

  for (let i = 0; i < count.length; i++) {
    if (count[i] > 0) {
      let time = [
        Math.floor(count[i] / (60 * 60 * 24)) // 天
        , Math.floor(count[i] / (60 * 60)) % 24 < 10 ? '0' + Math.floor(count[i] / (60 * 60)) % 24 : Math.floor(count[i] / (60 * 60)) % 24 // 时
        , Math.floor(count[i] / 60) % 60 < 10 ? '0' + Math.floor(count[i] / 60) % 60 :  Math.floor(count[i] / 60) % 60 // 分
        , Math.floor(count[i] % 60) < 10 ? '0' + Math.floor(count[i] % 60) : Math.floor(count[i] % 60) // 秒
			]
			
			arr.push(time)
			oldData.push(--count[i])

    } else {
			arr.push('')
			oldData.push('')
			nullNum++;
    }
	}
	
	let timer = setTimeout(function () {
		countDown(oldData, callback);
	}, 1000);

	if(nullNum >= count.length){
		clearTimeout(timer);
	}
	
	callback && callback(arr);

}


export {
  countDown
}
