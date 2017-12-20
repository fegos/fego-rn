//02-2, 35-2, 68-2 y1=y2 && x1-x2=|6 * outerRadius|  gap=1
//06-6, 17-6, 28-6 x1=x2 && y1-y2=|6 * outerRadius|  gap=3
//08-8,            x1-x2=|6 * outerRadius| && y1-y2=|6 * outerRadius|  gap=4
//26-4             x1-x2=|6 * outerRadius| && y1-y2=|6 * outerRadius|  gap=2

function getLineDistance(start, end) {
	return Math.sqrt(Math.pow(Math.abs(start.x - end.x), 2) + Math.pow(Math.abs(start.y - end.y), 2))
}

export function isPointInPath(location, origin, radius) {
	return radius > getLineDistance(location, origin)
}

export function getLineTransform(start, end) {
	let distance = getLineDistance(start, end)
	let rotateRad = Math.acos((end.x - start.x) / distance)
	if (start.y > end.y) {
		rotateRad = Math.PI * 2 - rotateRad
	}

	let translateX = (end.x + start.x) / 2 - start.x - distance / 2
	let translateY = (end.y + start.y) / 2 - start.y

	return {
		distance,
		rotateRad,
		translateX,
		translateY,
	}
}

export function getArrowTransform(start, end, width, borderWidth, vertexDeg) {
	let distance = getLineDistance(start, end)
	let rotateRad = Math.acos((end.x - start.x) / distance)
	if (start.y > end.y) {
		rotateRad = Math.PI * 2 - rotateRad
	}
	let origin = {
		x: start.x + Math.cos(rotateRad) * width * 2,
		y: start.y + Math.sin(rotateRad) * width * 2,
	}

	let vertexRad = vertexDeg / 2 * 2 * Math.PI / 360
	let translateX = -borderWidth
	let translateY = -borderWidth
	if (start.x == end.x) {
		if (end.y > start.y) {
			translateY = -borderWidth / 2
		}
		else {
			translateY = -borderWidth * 1.5
		}
	}
	else if (start.y == end.y) {
		if (end.x > start.x) {
			translateX = -borderWidth / 2
		}
		else {
			translateX = -borderWidth * 1.5
		}
	}
	else {
		if (start.x > end.x && start.y > end.y) {
			translateX = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
			translateY = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
		}
		else if (start.x > end.x && end.y > start.y) {
			translateX = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
			translateY = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
		}
		else if (end.x > start.x && start.y > end.y) {
			translateX = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
			translateY = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
		}
		else {
			translateX = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
			translateY = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
		}
	}

	return {
		origin,
		rotateRad,
		translateX,
		translateY,
	}
}

export function getPassword(sequence) {
	return sequence.join('')
}

export function getCrossPoint(points, lastPoint, currentPoint, radius) {

	if (lastPoint.index == 4 || currentPoint.index == 4) {
		return null
	}
	let x1 = lastPoint.origin.x
	let y1 = lastPoint.origin.y
	let x2 = currentPoint.origin.x
	let y2 = currentPoint.origin.y
	let crossLineLength = 6 * radius
	if ((y1 == y2 && Math.abs(x1 - x2) == crossLineLength)
		|| (x1 == x2 && Math.abs(y1 - y2) == crossLineLength)
		|| (Math.abs(x1 - x2) == crossLineLength && Math.abs(y1 - y2) == crossLineLength)) {
		let crossPointIndex = (lastPoint.index + currentPoint.index) / 2
		return points[crossPointIndex]
	}
	return null
}
/**
 * 计算两点连线的直线到指定点的距离
 * @param {*} point1 :{x:xx,y:xxx}
 * @param {*} point2 :{x:xx,y:xxx}
 * @param {*} orgin 指定点
 */
export function computerDistance(point1, point2, orgin) {
	let x0 = orgin.x, y0 = orgin.y,
		x1 = point1.x, y1 = point1.y,
		x2 = point2.x, y2 = point2.y;

	let A = y2 - y1;
	let B = x1 - x2;
	let C = x2 * y1 - x1 * y2;

	let distance = (Math.abs((y2 - y1) * x0 + (x1 - x2) * y0 + ((x2 * y1) - (x1 * y2))))
		/
		(Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x1 - x2, 2)));

	return distance;
}

/**
 * 计算两点决定的直线跟指定半径圆心的焦点
 * @param {*} pointA 
 * @param {*} pointB 
 * @param {*} center 
 * @param {*} radius 
 */
export function getCircleLineIntersectionPoint(pointA, pointB, center, radius) {

	let baX = pointB.x - pointA.x;
	let baY = pointB.y - pointA.y;
	let caX = center.x - pointA.x;
	let caY = center.y - pointA.y;

	let a = baX * baX + baY * baY;
	let bBy2 = baX * caX + baY * caY;
	let c = caX * caX + caY * caY - radius * radius;

	let pBy2 = bBy2 / a;
	let q = c / a;

	let disc = pBy2 * pBy2 - q;
	if (disc < 0) {
		return [];
	}

	let tmpSqrt = Math.sqrt(disc);
	let abScalingFactor1 = -pBy2 + tmpSqrt;
	let abScalingFactor2 = -pBy2 - tmpSqrt;

	let p1 = {
		x: pointA.x - baX * abScalingFactor1,
		y: pointA.y - baY * abScalingFactor1
	};
	if (disc == 0) { // abScalingFactor1 == abScalingFactor2
		return [p1]
	}
	let p2 = {
		x: pointA.x - baX * abScalingFactor2,
		y: pointA.y - baY * abScalingFactor2
	};
	if (p1.x < p2.x) {
		return [p1, p2];
	}
	else {
		return [p2, p1];
	}
}
/**
 * 给指定的数组进行排序
 * @param {*} originArr 原始数组 
 * @param {*} start 起点
 * @param {*} end 起点
 */
export function reSortArray(originArr, start, end) {

	if (originArr.length === 1) {
		let crossPoint = originArr[0];
		if (start.x < end.x) {
			return originArr;
		}
		else if (start.x === end.x) {
			if (start.y > end.y) {
				if (crossPoint.point2.y > crossPoint.point1.y) {
					let crossNewPoint = {
						index: crossPoint.index,
						point1: crossPoint.point2,
						point2: crossPoint.point1
					}
					return [crossNewPoint];
				}
				else {
					return originArr;
				}
			}
			else {
				if (crossPoint.point1.y > crossPoint.point2.y) {
					let crossNewPoint = {
						index: crossPoint.index,
						point1: crossPoint.point2,
						point2: crossPoint.point1
					}
					return [crossNewPoint];
				}
				else {
					return originArr;
				}
			}
		}
		else {
			let crossNewPoint = {
				index: crossPoint.index,
				point1: crossPoint.point2,
				point2: crossPoint.point1
			}
			return [crossNewPoint];
		}
	}
	else if (originArr.length === 2) {
		let crossPoint1 = originArr[0];
		let crossPoint2 = originArr[1];
		if (start.x < end.x) {
			if (crossPoint1.point1.x < crossPoint2.point1.x) {
				return originArr;
			}
			else {
				return [crossPoint2, crossPoint1];
			}
		}
		else if (start.x == end.x) {
			if (crossPoint1.point1.y < crossPoint1.point1.y) return originArr;
			else {
				return [crossPoint2, crossPoint1];
			}
		}
		else {
			let crossNewPoint1 = {
				index: crossPoint1.index,
				point1: crossPoint1.point2,
				point2: crossPoint1.point1
			}
			let crossNewPoint2 = {
				index: crossPoint2.index,
				point1: crossPoint2.point2,
				point2: crossPoint2.point1
			}
			if (crossNewPoint1.point1.x > crossNewPoint2.point1.x) {
				return [crossNewPoint1, crossNewPoint2];
			}
			else {
				return [crossNewPoint2, crossNewPoint1];
			}
		}
	}
	else {
		return originArr;
	}
}

export function pointInMiddleLine(crossPoint, start, end) {
	// console.log('======pointInMiddleLine======');
	// console.log(crossPoint);
	// console.log(start);
	// console.log(end);
	let result = false;
	if (start.x === end.x) {
		if ((crossPoint.y > start.y && crossPoint.y > end.y) ||
			(crossPoint.y < start.y && crossPoint.y < end.y)) {
			result = false;
		}
		else {
			result = true;
		}
	}
	else if ((crossPoint.x >= start.x && crossPoint.x >= end.x) ||
		(crossPoint.x <= start.x && crossPoint.x <= end.x)
	) {
		result = false;
	}
	else {
		result = true;
	}
	// console.log(result);
	// console.log('======pointInMiddleLine======');
	return result;
}