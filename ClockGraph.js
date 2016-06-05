ClockGrapg = function() {
	this.canvas = false;
	this.pi = Math.PI;
	this.blackColor = "#000";
	this.whiteColor = "#ffffff";
	this.redColor = "#ff0000";
	this.greenColor = "#00ff00";
	
	this.get_time = function() {
		var now = new Date();
		return {
			milliseconds: now.getMilliseconds(),
			seconds: now.getSeconds(),
			minutes: now.getMinutes(),
			hours: now.getHours()
		};
	};
	
	this.init = function(clockID) {
		this.canvas = document.getElementById(clockID).getContext("2d");
	};
	
	this.draw = function() {		
		var now = this.get_time();
		var hangle = this.pi * now.hours / 6  + (this.pi / 360) * now.minutes + (this.pi / 21600) * now.seconds + (this.pi / 21600000) * now.milliseconds;
		var mangle =                            (this.pi /  30) * now.minutes + (this.pi /  1800) * now.seconds + (this.pi /  1800000) * now.milliseconds;
		var sangle =                                                            (this.pi /    30) * now.seconds + (this.pi /    30000) * now.milliseconds;
		
		this.canvas.save();		//прямоугольник
		this.canvas.fillStyle = this.blackColor;
		this.canvas.strokeStyle = this.blackColor;
		this.canvas.clearRect(0, 0, 200, 200);
		this.canvas.fillRect (0, 0, 200, 200);
		this.canvas.translate(100, 100);
		this.canvas.rotate(-this.pi / 2);		
		
		this.canvas.save();		// часовая стрелка
		this.canvas.rotate(hangle);
		this.canvas.lineWidth = 8;
		this.canvas.strokeStyle = this.whiteColor;
		this.canvas.fillStyle = this.whiteColor;
		this.canvas.lineCap = "round";
		this.canvas.beginPath();
		this.canvas.moveTo(-10, 0);
		this.canvas.lineTo(50, 0);
		this.canvas.stroke();
		this.canvas.restore();

		this.canvas.save();		// минутная стрелка
		this.canvas.rotate(mangle);
		this.canvas.lineWidth = 4;
		this.canvas.strokeStyle = this.whiteColor;
		this.canvas.lineCap = "square";
		this.canvas.beginPath();
		this.canvas.moveTo(-20, 0);
		this.canvas.lineTo(75, 0);
		this.canvas.stroke();
		this.canvas.restore();

		this.canvas.save();		// мелкий круг в центре
		this.canvas.lineWidth = 2;
		this.canvas.strokeStyle = this.whiteColor;
		this.canvas.fillStyle = "#333";
		this.canvas.beginPath();
		this.canvas.arc(0, 0, 8, 0, this.pi * 2, true);
		this.canvas.fill();
		this.canvas.stroke();
		this.canvas.restore();		
		
		this.canvas.save();		// секундная стрелка
		this.canvas.rotate(sangle);
		this.canvas.lineWidth = 2;
		this.canvas.strokeStyle = this.redColor;
		this.canvas.lineCap = "square";
		this.canvas.beginPath();
		this.canvas.moveTo(-30, 0);
		this.canvas.lineTo(85, 0);
		this.canvas.stroke();
		this.canvas.restore();		

		this.canvas.save();		// точка в центре
		this.canvas.lineWidth = 6;
		this.canvas.fillStyle = this.redColor;
		this.canvas.beginPath();
		this.canvas.arc(0, 0, 3, 0, this.pi * 2, true);
		this.canvas.fill();
		this.canvas.restore();
		
		this.canvas.save();		// большой круг циферблата
		this.canvas.lineWidth = 6;
		this.canvas.strokeStyle = this.greenColor;
		this.canvas.beginPath();
		this.canvas.arc(0, 0, 95, 0, this.pi * 2, true);
		this.canvas.stroke();
		this.canvas.restore();
				
		this.canvas.restore();
	}
	
}

window.onload = function() {
	var clockGrapg = new ClockGrapg();
	clockGrapg.init("clockGrapg");
	window.setInterval(function() {
		clockGrapg.draw();
	}, 10);
}
