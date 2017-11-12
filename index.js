/*---------------------
| 作者：ckx
| 思路：
|		1.获取dom，取value值
|		2.检测输入格式是否正确
| 		3.将列字符串转化为数字
|		4.使用循环插入table
|		5.手动清空内存
| 说明：
|		1.输入行号必须为数字
|		2.输入列号格式必须正确，不区分大小写
|
-----------------------*/

function checkV(row,col){
	let reg = /^a*(b|c|d)?$/gi;
	if(isNaN(row.value)){
		return false;
	}else if(!reg.exec(col.value)){
		return false;
	}else{
		return true;
	}
}
function checkcol(node){
	let count = 0;
	let lastword = node.charAt(node.length-1);
	if(lastword == 'a' || lastword == 'A'){
		count += (node.length-1)*4 + 1;
	}else if(lastword == 'b' || lastword == 'B'){
		count += (node.length-1)*4 + 2;
	}else if(lastword == 'c' || lastword == 'C'){
		count += (node.length-1)*4 + 3;
	}else if(lastword == 'd' || lastword == 'D'){
		count += (node.length-1)*4 + 4;
	}
	lastword = null;
	return count;
}
function insert(rows,cols){
	this.rows = rows;
	this.cols = cols;
	this.par = document.getElementById('tb');
	this.code =  "<table>";
	for(let i = 0; i <= this.rows; i++){
		code += '<tr>';
		for(let n = 0; n <= this.cols ; n++){
			code += '<td>';
			if(i == 0 && n > 0){
				code += inserC(n);//写入第一行数据,即A,B,C,D.....
			}
			if( i > 0 && n == 0){
				code += i;//写入每一行数据,即1,2,3,4......
			}
			code += '</td>';
		}
		code += '</tr>';
	}
	this.code += '</table>';
	this.par.innerHTML = code;

	this.rows = null;
	this.cols = null;
	this.code = null;
	this.par = null;//手动释放内存
}
function inserC(cols){
		let aN = Math.floor((cols-1)/4);
		let eN = cols%4;
		let cellValue = "";
		for(let n = 0 ; n < aN ; n++){
			cellValue += "A";
		}
		if(eN == 0){
			cellValue += "D";
		}else if(eN == 1){
			cellValue += "A";
		}else if(eN == 2){
			cellValue += "B";
		}else if(eN == 3){
			cellValue += "C";
		}
		return cellValue;
}
function star(){
	let rows = document.getElementById('row');
	let cols = document.getElementById('col');
	let msg = document.getElementById('msg');
	if(!checkV(rows,cols)){
		msg.innerHTML = "您的输入有误，请检查输入是否正确!";
	}else{
		rows = parseInt(rows.value);
		cols = checkcol(cols.value);
		insert(rows,cols);
		msg.innerHTML = "已生成最新表格";
		rows = null;
		cols = null;
	}
}
