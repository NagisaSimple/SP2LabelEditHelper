let unitId = 0;
const mainId = new Date().getTime();
const messageText = document.getElementById("message");
const labelCode = document.getElementById("labelCode");
const a = document.getElementById("link");
let lastCharSetting = {};	//タグ最適化用に最後に表示する文字の設定を記録するやつ


function unitUpdate(id, flag){
	let target = document.getElementById(id);
	let name = target.getElementsByClassName("memo")[0].value;
	let layoutType = target.getElementsByClassName("layoutType")[0].value;
	let drawType = target.getElementsByClassName("drawType")[0].value;
	let summary = "";	//一覧表示用のタイトルを更新
	switch(drawType){
		case "char":
			if(target.getElementsByClassName("char").length>0){
				summary = target.getElementsByClassName("char")[0].value;
				if(summary.length > 10)
					summary = summary.substr(0,10) + "...";
			}
			summary += " (" + target.getElementsByClassName("layoutType")[0].options[target.getElementsByClassName("layoutType")[0].selectedIndex].text;
			if(name != "")
				summary += "_" + target.getElementsByClassName("memo")[0].value;
			summary += ")";
			break;
		case "line":
			summary = "ライン描画";
			summary += " (" + target.getElementsByClassName("layoutType")[0].options[target.getElementsByClassName("layoutType")[0].selectedIndex].text;
			if(name != "")
				summary += "_" + target.getElementsByClassName("memo")[0].value;
			summary += ")";
			break;
		case "comment":
			summary = "コメント";
			if(name != "")
				summary += " (" + target.getElementsByClassName("memo")[0].value + ")";
			break;
			
	}
		
	target.getElementsByClassName("summary")[0].innerText = summary;

	//表示タイプに応じて設定項目を変更
	let charTable = target.getElementsByClassName("charSettings")[0];
	if(flag == 1 || flag == 3){
		charTable.innerHTML = "";
		switch(drawType){
			case "char":
				trAdd(charTable, "", "<th valign=\"top\" rowspan=\"4\">表示設定</th>");
				trAdd(charTable, "", "<th onmouseover=\"showMessage('char')\">表示文字</th><td onmouseover=\"showMessage('char')\"><input class=\"char\" oninput=\"unitUpdate('" + id + "')\" type=\"text\" list=\"charList\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td><th onmouseover=\"showMessage('color')\">色</th><td onmouseover=\"showMessage('color')\" colspan=\"3\"><input type=\"text\" class=\"color\" placeholder=\"ｶﾗｰｺｰﾄﾞ\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td>");
				trAdd(charTable, "", "<th onmouseover=\"showMessage('size')\">サイズ</th><td onmouseover=\"showMessage('size')\"><input class=\"size\" type=\"text\" value=\"1\" style=\"width:100%; box-sizing:border-box\"/></td><th onmouseover=\"showMessage('widthC')\">横幅倍率</th><td onmouseover=\"showMessage('widthC')\"><input class=\"scale\" type=\"text\" value=\"1\" style=\"width:100%; box-sizing:border-box\"/></td>");
				trAdd(charTable, "", "<th onmouseover=\"showMessage('rotate')\">回転</th><td onmouseover=\"showMessage('rotate')\"><input class=\"rotate\" type=\"text\" value=\"0\"/ style=\"width:100%; box-sizing:border-box\"></td><th onmouseover=\"showMessage('rotateL')\" colspan=\"2\" align=\"left\"><font color=\"black\" class=\"rotateL\">　配置に沿って回転</font> <input class=\"rotateOffset\" type=\"checkbox\"/></th>");
				break;
			case "line":
				trAdd(charTable, "", "<th valign=\"top\" rowspan=\"2\">表示設定</th>");
				trAdd(charTable, "", "<th onmouseover=\"showMessage('widthL')\">線幅</th><td onmouseover=\"showMessage('widthL')\"><input type=\"text\" class=\"width\" placeholder=\"線幅\" value=\"0.1\" style=\"width:100%; box-sizing:border-box\"/></td><th onmouseover=\"showMessage('color')\">色</th><td onmouseover=\"showMessage('color')\" colspan=\"3\"><input type=\"text\" class=\"color\" placeholder=\"ｶﾗｰｺｰﾄﾞ\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td>");
				break;
		}
		
		target.getElementsByClassName("layoutType")[0].disabled = (drawType == "comment");
		target.getElementsByClassName("align")[0].disabled = (drawType == "comment");
		
		target.getElementsByClassName("layoutL")[0].color = (drawType == "comment")?"gray":"black";
		target.getElementsByClassName("alignL")[0].color = (drawType == "comment")?"gray":"black";
	}
	//配置タイプに応じて設定項目を変更
	let layoutTable = target.getElementsByClassName("layoutSettings")[0];
	if(flag == 2 || flag == 3 || drawType == "comment")
		layoutTable.innerHTML = "";
	if(flag == 2 || flag == 3 || (layoutTable.innerHTML == "" && drawType != "comment")){
		if(drawType != "comment"){
			switch(layoutType){
				case "char":
					trAdd(layoutTable, "", "<th valign=\"top\" rowspan=\"2\">配置設定</th>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('pos')\">位置</th><td onmouseover=\"showMessage('pos')\" colspan=\"3\" align=\"center\"><input type=\"text\" class=\"pos\" placeholder=\"x座標\" value=\"\" style=\"width:48%; box-sizing:border-box\"/>, <input type=\"text\" class=\"pos\" placeholder=\"y座標\" value=\"\" style=\"width:48%; box-sizing:border-box\"/></td>");
					break;
				case "circle":
					trAdd(layoutTable, "", "<th valign=\"top\" rowspan=\"4\">配置設定</th>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('division')\">分割数</th><td onmouseover=\"showMessage('division')\"><input type=\"text\" class=\"division\" placeholder=\"分割数\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td><th onmouseover=\"showMessage('r')\">半径</th><td onmouseover=\"showMessage('r')\"><input type=\"text\" class=\"radius\" placeholder=\"半径\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('posC')\">中心位置</th><td onmouseover=\"showMessage('posC')\" colspan=\"3\" align=\"center\"><nobr><input type=\"text\" class=\"pos\" placeholder=\"x座標\" value=\"\" style=\"width:48%; box-sizing:border-box\"/>, <input type=\"text\" class=\"pos\" placeholder=\"y座標\" value=\"\" style=\"width:48%; box-sizing:border-box\"/></nobr></td>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('angle')\">角度</th><td onmouseover=\"showMessage('angle')\" colspan=\"3\"><input type=\"text\" class=\"angle\" placeholder=\"角度(deg)\" value=\"\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td>");
					break;
				case "circle2":
					trAdd(layoutTable, "", "<th valign=\"top\" rowspan=\"4\">配置設定</th>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('division')\">分割数</th><td onmouseover=\"showMessage('division')\"><input type=\"text\" class=\"division\" placeholder=\"分割数\" value=\"\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td><th onmouseover=\"showMessage('r')\">半径</th><td onmouseover=\"showMessage('r')\"><input type=\"text\" class=\"radius\" placeholder=\"半径\" value=\"\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('posC')\">中心位置</th><td onmouseover=\"showMessage('posC')\" colspan=\"3\" align=\"center\"><nobr><input type=\"text\" class=\"pos\" placeholder=\"x座標\" value=\"\" style=\"width:48%; box-sizing:border-box\"/>, <input type=\"text\" class=\"pos\" placeholder=\"y座標\" value=\"\" style=\"width:48%; box-sizing:border-box\"/></nobr></td>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('angle2')\">角度</th><td onmouseover=\"showMessage('angle2')\" colspan=\"3\" align=\"center\"><nobr><input type=\"text\" class=\"angle\" placeholder=\"始点(deg)\" value=\"\" value=\"\" style=\"width:48%; box-sizing:border-box\"/>~<input type=\"text\" class=\"angle\" placeholder=\"終点(deg)\" value=\"\" value=\"\" style=\"width:48%; box-sizing:border-box\"/></nobr></td>");
					break;
				case "line":
					trAdd(layoutTable, "", "<th valign=\"top\" rowspan=\"3\">配置設定</th>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('division')\">分割数</th><td onmouseover=\"showMessage('division')\" colspan=\"3\"><input type=\"text\" class=\"division\" placeholder=\"分割数\" value=\"\" style=\"width:100%; box-sizing:border-box\"/></td>");
					trAdd(layoutTable, "", "<th onmouseover=\"showMessage('posL')\">位置</th><td onmouseover=\"showMessage('posL')\" colspan=\"3\" align=\"center\"><nobr><input type=\"text\" class=\"pos\" placeholder=\"始点X\" value=\"\" style=\"width:23%; box-sizing:border-box\"/>, <input type=\"text\" class=\"pos\" placeholder=\"始点Y\" value=\"\" style=\"width:23%; box-sizing:border-box\"/>~<input type=\"text\" class=\"pos\" placeholder=\"終点X\" value=\"\" style=\"width:23%; box-sizing:border-box\"/>, <input type=\"text\" class=\"pos\" placeholder=\"終点Y\" value=\"\" style=\"width:23%; box-sizing:border-box\"/></nobr></td>");
					break;
			}
		}
	}

	if(target.getElementsByClassName("rotateOffset").length > 0){
		target.getElementsByClassName("rotateOffset")[0].disabled = (layoutType == "char");
		target.getElementsByClassName("rotateL")[0].color = (layoutType == "char")?"gray":"black";
	}
	return;
}

function unitAdd(){
	const currentId = String(mainId) + "_" + String(unitId);
	unitId += 1;
	let frame = document.createElement("details");
	//frame.name = "charUnit";
	frame.className = "unit";
	frame.open = true;
	frame.id = currentId;
	let innerHTML = "";
	innerHTML += "<summary class=\"summary\">name</summary>";
	innerHTML += "<table border=\"1\" style=\"width:100%; max-width:800px\"><tbody class=\"frame\">";
	innerHTML += "<tbody class=\"mainTable\">";
	innerHTML += "<tr><th valign=\"top\" rowspan=\"4\" style=\"width:80px\">基本設定</th></tr>";
	innerHTML += "<tr><th onmouseover=\"showMessage('drawType')\" style=\"width:90px\">表示タイプ</th><td onmouseover=\"showMessage('drawType')\"><select class=\"drawType\" oninput=\"unitUpdate('" + currentId + "', 1)\" style=\"width:100%\"><option value=\"char\" selected>文字/文字列</option><option value=\"line\">ライン描画</option><option value=\"comment\">コメント挿入</option></select></td>";
	innerHTML += "<th onmouseover=\"showMessage('layoutType')\" style=\"width:90px\"><font color=\"black\" class=\"layoutL\">配置タイプ</font></th><td onmouseover=\"showMessage('layoutType')\"><select class=\"layoutType\" oninput=\"unitUpdate('" + currentId + "', 2)\" style=\"width:100%\"><option value=\"char\" selected>単体</option><option value=\"circle\">円</option><option value=\"circle2\">円弧</option><option value=\"line\">直線</option></select></td></tr>";
	innerHTML += "<tr><th onmouseover=\"showMessage('align')\"><font color=\"black\" class=\"alignL\">整列(横)</font></th><td onmouseover=\"showMessage('align')\"><select class=\"align\" style=\"width:100%\"><option value=\"left\">左揃え</option><option value=\"center\" selected>中央揃え</option></select></td><th onmouseover=\"showMessage('memo')\">メモ</th><td onmouseover=\"showMessage('memo')\"><input class=\"memo\" oninput=\"unitUpdate('" + currentId + "', 0)\" type=\"text\" value=\"\"/ style=\"width:100%; box-sizing:border-box\"></td></tr>";
	innerHTML += "</tbody>";
	innerHTML += "<tbody class=\"charSettings\" style=\"background:#EEEEEE\"></tbody>";
	innerHTML += "<tbody class=\"layoutSettings\"></table>";
	innerHTML += "<button onclick=\"unitDelete('" + currentId + "')\" onmouseover=\"showMessage('deleteUnit')\" style=\"width:100%\; max-width:800px\" class=\"deleteButton\">削除</button>";
	innerHTML += "</details>";

	frame.innerHTML = innerHTML;
	document.getElementById("units").appendChild(frame);
	unitUpdate(currentId, 3);
	return currentId;
}

function unitDelete(id){	//入力欄を消去
	document.getElementById(id).remove();
	return;
}

function trAdd(table, className, innerHTML){	//入力欄を追加
	let tr = document.createElement("tr");
	if(className != "")
		tr.className = className;
	tr.innerHTML = innerHTML;
	table.appendChild(tr);
	return;
}

function showMessage(id){
	messageText.innerText = messageList[id];
	return;
}

function superSplit(text, division){	//カンマ区切りの奴を配列に変換するやつ
	let listA = text.split(",");
	let listB = [];
	let buff = "";
	for(let i = 0; i < listA.length; i++){
		buff += listA[i];
		if(buff.includes("{")){
			if(buff.includes("}")){
				if(buff == "{,}" || buff == "{\",\"}")
					buff = ",";
				listB.push(buff);
				buff = "";
			}else{
				buff += ",";
			}
		}else{
			listB.push(buff);
			buff = "";
		}
	}
	if(listB.length < division){
		const forCount = division-listB.length
		for(let i = 0; i < forCount; i++)
			listB.push(listB[i]);
	}
	return listB;
}

function lerpList(start, end, division){
	let s = start;
	if(!isNaN(s))
		s = Number(s);
	let e = end;
	if(!isNaN(e))
		e = Number(e);
	const c = Number(division) - 1;
	let list = [s];
	for(let i = 1; i<c; i++){
		list.push(isNaN(s) || isNaN(e) ? "lerp(" + s + "," + e + "," + numFix(i/c) + ")" : s + (e-s)/c*i);
	}
	list.push(e);
	return list;
}

function convertUnit(unit){	//要素の変換処理
	let name = unit.getElementsByClassName("memo")[0].value;
	let layoutType = unit.getElementsByClassName("layoutType")[0].value;
	let drawType = unit.getElementsByClassName("drawType")[0].value;

	let text = "";
	if(drawType == "comment"){//コメント挿入
		if(name !== "")
			text = "{false?\"" + name + "\":\"\"}";
		else
			text = "";
		return text + "\n";
	}
	
	let unitCount;	//配置の反復回数
	let divisionList;	//1回あたりの配置文字数
	let charList;
	let sizeList, scaleList;
	let rotateList, rotateOffset;
	let colorList;
	let radiusList;
	let sAngleList, eAngleList;
	let unitXList, unitYList;	//基準点の座標
	let endXList, endYList;
	let alignScale = (unit.getElementsByClassName("align")[0].value == "center" ? 2 : 1);
	switch(layoutType){
		case "char":	//-----単体----------------------------------------------------
			unitCount = Math.max(superSplit(unit.getElementsByClassName("pos")[0].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[1].value, 0).length
			);
			switch(drawType){
				case "char":
					charList = superSplit(unit.getElementsByClassName("char")[0].value, unitCount);
					sizeList = superSplit(unit.getElementsByClassName("size")[0].value, unitCount);
					scaleList = superSplit(unit.getElementsByClassName("scale")[0].value, unitCount);
					rotateList = superSplit(unit.getElementsByClassName("rotate")[0].value, unitCount);
					colorList = superSplit(unit.getElementsByClassName("color")[0].value, unitCount);
					break;
				case "line":
					charList = superSplit(".", unitCount);
					let widthList = superSplit(unit.getElementsByClassName("width")[0].value, unitCount);
					sizeList = [];
					scaleList = [];
					let charSize = charSizeList["."][document.getElementById("font").value];
					for(let i = 0; i < unitCount; i++){
						if(isNaN(widthList[i]))
							sizeList.push(widthList[i] + "/" + charSize[1]);
						else
							sizeList.push(widthList[i] / charSize[1]);
						scaleList.push(charSize[1] / charSize[0]);
					}
					rotateList = superSplit("0", unitCount);
					colorList = superSplit(unit.getElementsByClassName("color")[0].value, unitCount);
					
					break;
			}
			unitXList = superSplit(unit.getElementsByClassName("pos")[0].value, unitCount);
			unitYList = superSplit(unit.getElementsByClassName("pos")[1].value, unitCount);
			for(let i = 0; i < unitCount; i++)
				text += buildChar({"font":document.getElementById("font").value, "align":unit.getElementsByClassName("align")[0].value,"char":charList[i], "size":sizeList[i],"scale":scaleList[i],"rotate":rotateList[i],"color":colorList[i],"posX":unitXList[i],"posY":unitYList[i]});
			break;
		case "circle":	//-----円----------------------------------------------------
			unitCount = Math.max(superSplit(unit.getElementsByClassName("angle")[0].value, 0).length,
								superSplit(unit.getElementsByClassName("division")[0].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[0].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[1].value, 0).length,
								superSplit(unit.getElementsByClassName("radius")[0].value, 0).length);
			sAngleList = superSplit(unit.getElementsByClassName("angle")[0].value, unitCount);
			divisionList = superSplit(unit.getElementsByClassName("division")[0].value, unitCount);
			unitXList = superSplit(unit.getElementsByClassName("pos")[0].value, unitCount);
			unitYList = superSplit(unit.getElementsByClassName("pos")[1].value, unitCount);
			radiusList = superSplit(unit.getElementsByClassName("radius")[0].value, unitCount);

			if(drawType == "char")
				rotateOffset = unit.getElementsByClassName("rotateOffset")[0].checked;
			else
				rotateOffset = true;
			
			for(let i = 0; i < unitCount; i++){
				switch(drawType){
					case "char":
						charList = superSplit(unit.getElementsByClassName("char")[0].value, divisionList[i]);
						rotateList = superSplit(unit.getElementsByClassName("rotate")[0].value, divisionList[i]);
						scaleList = superSplit(unit.getElementsByClassName("scale")[0].value, divisionList[i]);
						sizeList = superSplit(unit.getElementsByClassName("size")[0].value, divisionList[i]);
						break;
					case "line":
						charList = superSplit("|", divisionList[i]);
						rotateList = superSplit("0", divisionList[i]);
						let charSize = charSizeList["|"][document.getElementById("font").value];
						let widthList = superSplit(unit.getElementsByClassName("width")[0].value, unitCount);
						let deltaAngle = lerpList(0, 360, Number(divisionList[i])+1)[1];
						let lineLength = Math.sqrt(2- 2 * Math.cos(deltaAngle * Math.PI / 180));
						lineLength = isNaN(radiusList[i]) ? lineLength + "*" + radiusList[i] : lineLength * Number(radiusList[i]);
						
						radiusList[i] = isNaN(radiusList[i]) ? radiusList[i] + "*" + numFix(Math.cos(deltaAngle / 2 * Math.PI / 180)) : Number(radiusList[i]) * Math.cos(deltaAngle / 2 * Math.PI / 180);
						sizeList = [];
						scaleList = [];
						for(let j = 0; j < Number(divisionList[i]); j++){
							sizeList.push(isNaN(lineLength) ? lineLength + "/" + charSize[1] : lineLength / charSize[1]);
							scaleList.push(isNaN(widthList[i]) || isNaN(lineLength) ? widthList[i] + "/" + charSize[0] + "/(" + sizeList[0] + ")" : widthList[i] / charSize[0] / sizeList[0]);
						}
						sAngleList[i] = isNaN(sAngleList[i]) ? sAngleList[i] + "+" + (360 / Number(divisionList[i]) / 2) : Number(sAngleList[i]) + (360 / Number(divisionList[i]) / 2);
						break;
				}
				colorList = superSplit(unit.getElementsByClassName("color")[0].value, divisionList[i]);
				let pAngleList = lerpList(0, 360, Number(divisionList[i])+1);
				for(let j = 0; j < divisionList[i]; j++){
					let pAngle = isNaN(sAngleList[i]) || isNaN(pAngleList[j]) ? pAngleList[j] + "+" + sAngleList[i] : Number(pAngleList[j]) + Number(sAngleList[i]);
					let cos = isNaN(pAngle) ? "cos(" + pAngle + ")" : Math.cos(pAngle * Math.PI / 180) ;
					let sin = isNaN(pAngle) ? "sin(" + pAngle + ")" : Math.sin(pAngle * Math.PI / 180) ;
					if(isNaN(pAngle) || isNaN(radiusList[i])){
						cos = numFix(cos) + "*" + radiusList[i];
						sin = numFix(sin) + "*" + radiusList[i];
					}else{
						cos *= Number(radiusList[i]);
						sin *= Number(radiusList[i]);
					}
					cos = isNaN(cos) || isNaN(unitXList[i]) ? numFix(cos) + "+" + unitXList[i] : cos + Number(unitXList[i]);
					sin = isNaN(sin) || isNaN(unitYList[i]) ? numFix(sin) + "+" + unitYList[i] : sin + Number(unitYList[i]);
					let rotate = rotateOffset ? (isNaN(pAngle) || isNaN(rotateList[j]) ? pAngle + "+" + rotateList[j] : Number(pAngle) + Number(rotateList[j])) : Number(rotateList[j]);
					text += buildChar({"font":document.getElementById("font").value, "align":unit.getElementsByClassName("align")[0].value,"char":charList[j], "size":sizeList[j],"scale":scaleList[j],"rotate":rotate,"color":colorList[j],"posX":cos,"posY":sin});
				}
				text += "\n";
			}
			break;
		case "circle2":	//-----円弧----------------------------------------------------
			unitCount = Math.max(superSplit(unit.getElementsByClassName("division")[0].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[0].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[1].value, 0).length,
								superSplit(unit.getElementsByClassName("radius")[0].value, 0).length);
			sAngleList = superSplit(unit.getElementsByClassName("angle")[0].value, unitCount);
			eAngleList = superSplit(unit.getElementsByClassName("angle")[1].value, unitCount);
			divisionList = superSplit(unit.getElementsByClassName("division")[0].value, unitCount);
			unitXList = superSplit(unit.getElementsByClassName("pos")[0].value, unitCount);
			unitYList = superSplit(unit.getElementsByClassName("pos")[1].value, unitCount);
			radiusList = superSplit(unit.getElementsByClassName("radius")[0].value, unitCount);

			for(let i = 0; i < unitCount; i++){
				let pAngleList = [];
				switch(drawType){
					case "char":
						charList = superSplit(unit.getElementsByClassName("char")[0].value, divisionList[i]);
						rotateList = superSplit(unit.getElementsByClassName("rotate")[0].value, divisionList[i]);
						rotateOffset = unit.getElementsByClassName("rotateOffset")[0].checked;
						scaleList = superSplit(unit.getElementsByClassName("scale")[0].value, divisionList[i]);
						sizeList = superSplit(unit.getElementsByClassName("size")[0].value, divisionList[i]);
						pAngleList = lerpList(sAngleList[i], eAngleList[i], Number(divisionList[i]));
						break;
					case "line":
						charList = superSplit("|", divisionList[i]);
						rotateList = superSplit("0", divisionList[i]);
						rotateOffset = true;
						let charSize = charSizeList["|"][document.getElementById("font").value];
						let widthList = superSplit(unit.getElementsByClassName("width")[0].value, unitCount);
						let pAngleListB = lerpList(sAngleList[i], eAngleList[i], Number(divisionList[i])*2+1);
						for(let j = 0; j < divisionList[i]; j++){
							pAngleList.push(pAngleListB[j*2+1]);
						}
						let deltaAngle = isNaN(sAngleList[i]) || isNaN(eAngleList[i]) ? "(" + eAngleList[i] + "-" + sAngleList[i] + ")/" + numFix(divisionList[i]) : (eAngleList[i] - sAngleList[i]) / Number(divisionList[i]);
						let lineLength = isNaN(deltaAngle) ? "sqrt(2-2*cos(" + deltaAngle + "))" : Math.sqrt(2- 2 * Math.cos(deltaAngle * Math.PI / 180));
						lineLength = isNaN(radiusList[i]) || isNaN(lineLength) ? lineLength + "*" + radiusList[i] : lineLength * Number(radiusList[i]);
						let radiusOffset = isNaN(deltaAngle) ? "cos(" + deltaAngle + "/2)" : (Math.cos(deltaAngle / 2 * Math.PI / 180));
						radiusList[i] = isNaN(radiusList[i]) || isNaN(radiusOffset) ? radiusList[i] + "*" + radiusOffset : Number(radiusList[i]) * radiusOffset;
						sizeList = [];
						scaleList = [];
						for(let j = 0; j < Number(divisionList[i]); j++){
							sizeList.push(isNaN(lineLength) ? lineLength + "/" + charSize[1] : lineLength / charSize[1]);
							scaleList.push(isNaN(widthList[i]) || isNaN(lineLength) ? widthList[i] + "/" + charSize[0] + "/(" + sizeList[0] + ")" : widthList[i] / charSize[0] / sizeList[0]);
						}
						sAngleList[i] = isNaN(sAngleList[i]) ? sAngleList[i] + "+" + (360 / Number(divisionList[i]) / 2) : Number(sAngleList[i]) + (360 / Number(divisionList[i]) / 2);
						break;
				}
				colorList = superSplit(unit.getElementsByClassName("color")[0].value, divisionList[i]);
				
				for(let j = 0; j < divisionList[i]; j++){
					let cos = isNaN(pAngleList[j]) ? "cos(" + pAngleList[j] + ")" : Math.cos(pAngleList[j] * Math.PI / 180) ;
					let sin = isNaN(pAngleList[j]) ? "sin(" + pAngleList[j] + ")" : Math.sin(pAngleList[j] * Math.PI / 180) ;
					if(isNaN(pAngleList[j]) || isNaN(radiusList[i])){
						cos = numFix(cos) + "*" + radiusList[i];
						sin = numFix(sin) + "*" + radiusList[i];
					}else{
						cos *= Number(radiusList[i]);
						sin *= Number(radiusList[i]);
					}
					cos = isNaN(cos) || isNaN(unitXList[i]) ? numFix(cos) + "+" + unitXList[i] : cos + Number(unitXList[i]);
					sin = isNaN(sin) || isNaN(unitYList[i]) ? numFix(sin) + "+" + unitYList[i] : sin + Number(unitYList[i]);
					let rotate = rotateOffset ? (isNaN(pAngleList[j]) || isNaN(rotateList[j]) ? pAngleList[j] + "+" + rotateList[j] : Number(pAngleList[j]) + Number(rotateList[j])) : Number(rotateList[j]);
					text += buildChar({"font":document.getElementById("font").value, "align":unit.getElementsByClassName("align")[0].value,"char":charList[j], "size":sizeList[j],"scale":scaleList[j],"rotate":rotate,"color":colorList[j],"posX":cos,"posY":sin});
				}
				text += "\n";
			}
			break;
		case "line":	//-----直線----------------------------------------------------
			unitCount = Math.max(superSplit(unit.getElementsByClassName("pos")[0].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[1].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[2].value, 0).length,
								superSplit(unit.getElementsByClassName("pos")[3].value, 0).length);
			divisionList = superSplit(unit.getElementsByClassName("division")[0].value, unitCount);
			unitXList = superSplit(unit.getElementsByClassName("pos")[0].value, unitCount);
			unitYList = superSplit(unit.getElementsByClassName("pos")[1].value, unitCount);
			endXList = superSplit(unit.getElementsByClassName("pos")[2].value, unitCount);
			endYList = superSplit(unit.getElementsByClassName("pos")[3].value, unitCount);

			for(let i = 0; i < unitCount; i++){
				let lerpPList = [];
				let lineMode;
				switch(drawType){
					case "char":
						charList = superSplit(unit.getElementsByClassName("char")[0].value, divisionList[i]);
						lineMode = superSplit(unit.getElementsByClassName("char")[0].value, 0).length == 1 && divisionList[i] > 1;
						rotateList = superSplit(unit.getElementsByClassName("rotate")[0].value, divisionList[i]);
						rotateOffset = unit.getElementsByClassName("rotateOffset")[0].checked;
						scaleList = superSplit(unit.getElementsByClassName("scale")[0].value, divisionList[i]);
						sizeList = superSplit(unit.getElementsByClassName("size")[0].value, divisionList[i]);
						lerpPList = lerpList(0, 1, Number(divisionList[i]));
						break;
					case "line":
						charList = superSplit("|", divisionList[i]);
						lineMode = divisionList[i] > 1;
						rotateList = superSplit("90", divisionList[i]);
						rotateOffset = true;
						let charSize = charSizeList["|"][document.getElementById("font").value];
						let widthList = superSplit(unit.getElementsByClassName("width")[0].value, unitCount);
						let lerpPListB = lerpList(0, 1, Number(divisionList[i])*2+1);
						for(let j = 0; j < divisionList[i]; j++){
							lerpPList.push(lerpPListB[j*2+1]);
						}
						let lineLength = isNaN(unitXList[i]) || isNaN(unitYList[i]) || isNaN(endXList[i]) || isNaN(endYList[i]) ?
											"sqrt(pow(" + endXList[i] + "-" + unitXList[i] + ",2)+pow(" + endYList[i] + "-" + unitYList[i] + ",2))*" + lerpList(0, 1, Number(divisionList[i])+1)[1] :
											Math.sqrt((endXList[i] - unitXList[i])**2 + (endYList[i] - unitYList[i])**2) * lerpList(0, 1, Number(divisionList[i])+1)[1];
						sizeList = [];
						scaleList = [];
						for(let j = 0; j < Number(divisionList[i]); j++){
							sizeList.push(isNaN(lineLength) ? lineLength + "/" + charSize[1] : lineLength / charSize[1]);
							scaleList.push(isNaN(widthList[i]) || isNaN(lineLength) ? widthList[i] + "/" + charSize[0] + "/(" + sizeList[0] + ")" : widthList[i] / charSize[0] / sizeList[0]);
						}
						break;
				}
				colorList = superSplit(unit.getElementsByClassName("color")[0].value, divisionList[i]);
				let lineAngle = isNaN(unitXList[i]) || isNaN(unitYList[i]) || isNaN(endXList[i]) || isNaN(endYList[i]) ?
								"atan2(" + endYList[i] + "-" + unitYList[i] + "," + endXList[i] + "-" + unitXList[i] + ")":
								Math.atan2(endYList[i] - unitYList[i], endXList[i] - unitXList[i]) / Math.PI * 180;
				let step = divisionList[i] > 1 ? lerpPList[1]-lerpPList[0] : 0.5;
				let lineOffset = isNaN(unitYList[i]) || isNaN(endYList[i]) ?  "{(" + endYList[i].replace(/{/g,"(").replace(/}/g,")") + "-" + unitYList[i].replace(/{/g,"(").replace(/}/g,")") + ")*" + numFix(step * (divisionList[i] - 1)) + ";f6}" :
																			numFix((endYList[i] - unitYList[i]) * step * (divisionList[i] - 1));
				
				console.log(lerpPList[1],lerpPList[0], lineOffset);
				for(let j = 0; j < divisionList[i]; j++){
					let X, Y;
					if(isNaN(unitXList[i]) || isNaN(unitYList[i]) || isNaN(endXList[i]) || isNaN(endYList[i])){//座標計算
						X = "lerp(" + unitXList[i] + "," + endXList[i] + "," + lerpPList[j] + ")";
						Y = "lerp(" + unitYList[i] + "," + endYList[i] + "," + lerpPList[j] + ")";
					}else{
						X = Number(unitXList[i]) + Number(lerpPList[j]) * (endXList[i] - unitXList[i]);
						Y = Number(unitYList[i]) + Number(lerpPList[j]) * (endYList[i] - unitYList[i]);
					}
					let rotate = rotateOffset ? (isNaN(lineAngle) || isNaN(rotateList[j]) ? lineAngle + "+" + rotateList[j] : Number(lineAngle) + Number(rotateList[j])) : Number(rotateList[j]);
					if(lineMode){
						if(j == 0){
							text += "<line-height=" + (isNaN(endYList[i]) || (drawType == "line" && isNaN(unitYList[i])) ? "{(" + unitYList[i].replace(/{/g,"(").replace(/}/g,")") + "-" + endYList[i].replace(/{/g,"(").replace(/}/g,")") + ")" + "*" + numFix(step) + ";f6}" : numFix((unitYList[i] - endYList[i]) * step) ) + ">";
							text += buildChar({"font":document.getElementById("font").value, "align":unit.getElementsByClassName("align")[0].value,"char":charList[j], "size":sizeList[j],"scale":scaleList[j],"rotate":rotate,"color":colorList[j],"posX":X,"posY":Y}).replace("<pos","<indent");
						}else{
							text += "<space=" + (isNaN(endXList[i]) || (drawType == "line" && isNaN(unitXList[i])) ?
												"{(" + endXList[i].replace(/{/g,"(").replace(/}/g,")") + "-" + unitXList[i].replace(/{/g,"(").replace(/}/g,")") + ")" + "*" + numFix(step * j * alignScale) + ";f6}" :
												numFix((endXList[i] - unitXList[i]) * step * j * alignScale)) + ">" + charList[j];
							if(j < divisionList[i] - 1)
								text += "<br>";
						}
					}else{
						text += buildChar({"font":document.getElementById("font").value, "align":unit.getElementsByClassName("align")[0].value,"char":charList[j], "size":sizeList[j],"scale":scaleList[j],"rotate":rotate,"color":colorList[j],"posX":X,"posY":Y});
					}
				}

				if(lineMode){
					let lineOffset = isNaN(unitYList[i]) || isNaN(endYList[i]) ?  "{(" + endYList[i].replace(/{/g,"(").replace(/}/g,")") + "-" + unitYList[i].replace(/{/g,"(").replace(/}/g,")") + ")*" + numFix(step * (divisionList[i] - 1)) + ";f6}" :
																				numFix((endYList[i] - unitYList[i]) * step * (divisionList[i] - 1));
					text += "<line-height=" + lineOffset + "><br><line-height=0>"
				}
				text += "\n";
			}
			break;
	}
	return text + "\n";
}

function buildChar(charSetting){		//設置する文字の誤差を補正し、サイズや角度等とあわせてタグを組み立てる
	if(charSetting["char"] != "" && charSetting["char"] != " "){
		let charSpec = [0,0,0,0,0,0];
		if(charSetting["char"] in charDataList){
			charSpec = charDataList[charSetting["char"]][charSetting["font"]];
			//Cx, Cy, Xl, Xc, Y, S
		}else{
			charSpec = fontDefaultList[charSetting["font"]];
		}
		let offset = [["", ""], ["", ""]];
		let align = charSetting["align"];				//字詰め決定
		let size = charSetting["size"];					//文字サイズ決定
		if(size === "")
			size = lastCharSetting["size"];
		if(!isNaN(size))
			size = Number(size);
		let scale = charSetting["scale"];				//横幅決定
		if(scale === "")
			scale = lastCharSetting["scale"];
		if(!isNaN(scale))
			scale = Number(scale);
		let rotate = charSetting["rotate"];				//向き決定
		if(rotate === "")
			rotate = lastCharSetting["rotate"];
		if(!isNaN(rotate))
			rotate = Number(rotate);
		let color = charSetting["color"];				//カラーコード決定
		if(color[0] >= "#")		//表記ゆれを吸収
			color = color.replace(/#/g,"");
		let posX = charSetting["posX"];					//x座標決定
			if(!isNaN(posX))
				posX = Number(posX);
		let posY = charSetting["posY"];					//y座標決定
			if(!isNaN(posY))
				posY = Number(posY);

		if(isNaN(rotate)){					//回転中心のズレを補正
			offset[0][0] = (charSpec[0] != 0 ? "cos(" + rotate + ")*" + charSpec[0] : 0);//Cxの誤差
			offset[1][0] = (charSpec[0] != 0 ? "sin(" + rotate + ")*" + charSpec[0] : 0);
			offset[0][1] = (charSpec[1] != 0 ? "-sin(" + rotate + ")*" + charSpec[1] : 0);//Cyの誤差
			offset[1][1] = (charSpec[1] != 0 ? "cos(" + rotate + ")*" + charSpec[1] : 0);
		}else{
			offset[0][0] = Math.cos(rotate * Math.PI / 180) * charSpec[0];//Cxの誤差
			offset[1][0] = Math.sin(rotate * Math.PI / 180) * charSpec[0];
			offset[0][1] = -Math.sin(rotate * Math.PI / 180) * charSpec[1];//Cyの誤差
			offset[1][1] = Math.cos(rotate * Math.PI / 180) * charSpec[1];
		}
		
		if(isNaN(scale))
			scale = "(" + scale + ")";
		let trueScale = (isNaN(scale) ? "(" + scale + "*" + (1 + charSpec[5]) + "-" + charSpec[5] + ")" : scale * (1 + charSpec[5]) - charSpec[5]);
		offset[0] = (offset[0][0] != 0 && offset[0][1] != 0)? offset[0][0] + offset[0][1] : (offset[0][0] != 0 ? offset[0][0] : offset[0][1]);//FTなら文字列結合で、数値なら加算で合成
		if(offset[1][0] != 0 && offset[1][1] != 0)
			offset[1] = (isNaN(offset[1][0]) || isNaN(offset[1][1]) || isNaN(trueScale) ? offset[1][0] + "*" + trueScale + "+" + offset[1][1] : offset[1][0] * trueScale + offset[1][1]);
		else{
			if(offset[1][0] != 0)
				offset[1] = (isNaN(offset[1][0]) || isNaN(trueScale) ? offset[1][0] + "*" + trueScale : offset[1][0] * trueScale);
			else
				offset[1] = offset[1][1];
		}

		if(align == "left")
			offset[0] = (isNaN(offset[0]) || isNaN(scale) || isNaN(size) ? "(" + -charSpec[2] + "*" + trueScale + "+(" + offset[0] + ")*" + scale + ")*" + size : (-charSpec[2]*trueScale+offset[0]*scale) * size);
		else
			offset[0] = (isNaN(offset[0]) || isNaN(scale) || isNaN(size) ? "(" + -charSpec[3] + "+" + offset[0] + ")*" + size + "*" + scale + "-0.0005" : (-charSpec[3] + offset[0]) * size*scale-0.0005);
		offset[1] = (isNaN(offset[1]) || isNaN(scale) || isNaN(size) ? "(" + -charSpec[4] + "+" + offset[1] + ")*" + size : (-charSpec[4]+offset[1]) * size);
		if(align == "left")
			posX = (isNaN(posX) || isNaN(offset[0]) ? posX + "+" + offset[0] : posX+offset[0]);
		else
			posX = (isNaN(posX) || isNaN(offset[0]) ? "(" + posX + "+" + offset[0] + ")*2" : (posX+offset[0])*2);
		posY = (isNaN(posY) || isNaN(offset[1]) ? posY + "+" + offset[1] : posY+offset[1]);

		if(isNaN(posX) && posX != null){
			posX = posX.replace(/{/g,"(").replace(/}/g,")");
			posX = "{" + posX + ";f6}";
		}
		if(isNaN(posY) && posY != null){
			posY = posY.replace(/{/g,"(").replace(/}/g,")");
			posY = "{" + posY + ";f6}";
		}
		if(isNaN(rotate) && rotate != null){
			rotate = rotate.replace(/{/g,"(").replace(/}/g,")");
			rotate = "{(" + rotate + ")%360;f}";
		}
		if(isNaN(size) && size != null){
			size = size.replace(/{/g,"(").replace(/}/g,")");
			size = "{" + size + ";f6}";
		}
		if(isNaN(scale) && scale != null){
			trueScale = trueScale.replace(/{/g,"(").replace(/}/g,")");
			trueScale = "{" + trueScale + ";f6}";
		}
		if(color.includes("{")){
			color = color.replace(/{/g,"(").replace(/}/g,")");
			color = "{" + color + "}";
		}
			
		let text = "";									//書き出し用に空の文字列を定義
		if(align != lastCharSetting["align"]){			//alignタグ追加(水平方向の基準点)
			text += "<align=" + align + ">";
			lastCharSetting["align"] = align;
		}
		if(posX != 0)									//posタグ追加(x座標)
			text += "<pos=" + numFix(posX) + ">";
		posY = numFix(posY);
		if(posY != lastCharSetting["posY"]){			//posタグ追加(y座標)
			if(posY == 0)
				text += "</voffset>";
			else
				text += "<voffset=" + posY + ">";
			lastCharSetting["posY"] = posY;
		}
		size = numFix(size);
		if(size != lastCharSetting["size"]){			//sizeタグ追加(文字サイズ)
			text += "<size=" + size + ">";
			lastCharSetting["size"] = size;
		}
		trueScale = numFix(trueScale);
		if(scale != lastCharSetting["scale"]){
			if(scale == 0)
				text += "</scale>";
			else
			text += "<scale=" + trueScale + ">";			//scaleタグ追加(横幅)
			lastCharSetting["scale"] = trueScale;
		}
		rotate = numFix(rotate);
		if(rotate != lastCharSetting["rotate"]){		//rotateタグ追加(回転)
			if(rotate == 0)
				text += "</rotate>";
			else
			text += "<rotate=" + rotate + ">";
			lastCharSetting["rotate"] = rotate;
		}
		if(color != lastCharSetting["color"]){			//colorタグ追加(色)
			if(color  == "")
				text += "</color>";
			else
			text += "</color><color=#" + color + ">";
			lastCharSetting["color"] = color;
		}
		return text + charSetting["char"] + "<br>";		//改行追加(区切り用)
	}else{
		return "";										//文字が空欄なら無を返す
	}
}

function numFix(text){		//0.9999999999みたいになる奴を修正
	if(isNaN(text)){
			t = String(text);
		let list = t.match(/[0-9]\.[0-9]+/g);
		if(list != null)
			for(let i = 0; i < list.length; i++)
				t = t.replace(list[i], String(Math.round(Number(list[i])*10000000)/10000000));
		t = t.replace(/\+\-/g, "-");
		t = t.replace(/\-\-/g, "+");
		t = t.replace(/\+\+/g, "+");
		t = t.replace(/[\+\-]0+\+/g, "+");
		t = t.replace(/[\+\-]0+\-/g, "-");
	}else
		t = String(Math.round(text*10000000)/10000000);
	return t;
}

function update(){	//ラベル組み立て
	lastCharSetting = {"font":document.getElementById("font").value, "align":"あ", "char":"あ", "size":"あ", "scale":"あ", "rotate":"あ", "color":"あ", "posX":"あ", "posY":"あ"}
	let text = "<size=0><line-height=0>\n";
	let unitList = document.getElementsByClassName("unit");
	for(let i = 0; i < unitList.length; i++){
		text += convertUnit(unitList[i]);
	}
	text += "<size=0></voffset>.\n";
	labelCode.value = text;
	labelCodeCopy()
}

function labelCodeCopy(){		//文字列をクリップボードへコピー
	if (navigator.clipboard){
		navigator.clipboard.writeText(labelCode.value);
	}
	else{
		labelCode.select();
		document.execCommand("Copy");
	}
}

document.getElementById("loadNew").addEventListener('change', function(e){		//新規読込処理
	const file = e.target.files[0];
	if (file != null){
		const reader = new FileReader();
		reader.onload = function(event){	//読込完了時の処理を予約
			load(reader.result, true);
		};
		reader.readAsText(file);			//読込実行
	}
});

document.getElementById("loadAdd").addEventListener('change', function(e){		//追加読込処理
	const file = e.target.files[0];
	if (file != null){
		const reader = new FileReader();
		reader.onload = function(event){	//読込完了時の処理を予約
			load(reader.result, false);
		};
		reader.readAsText(file);			//読込実行
	}
});

function load(text, isNew){
	const settings = JSON.parse(text);
	if(isNew){
		document.getElementById("font").value = settings["font"];
		document.getElementById("valign").value = settings["valign"];
		let deleteList = document.getElementsByClassName("deleteButton");
		while(0 < deleteList.length)
			deleteList[0].onclick();
	}
	for(let i = 0; i < settings["unitSettings"].length; i++){
		const unitId = unitAdd();
		let unit = document.getElementById(unitId);
		const unitSettings = settings["unitSettings"][i];
		unit.getElementsByClassName("memo")[0].value = unitSettings["memo"];
		unit.getElementsByClassName("align")[0].value = unitSettings["align"];
		unit.getElementsByClassName("drawType")[0].value = unitSettings["drawType"];
		unit.getElementsByClassName("layoutType")[0].value = unitSettings["layoutType"];
		unitUpdate(unitId, 3);	//入力欄を基本設定に合わせるために一旦更新
		const drawKeys = Object.keys(unitSettings["drawSettings"]);
		for(let j = 0; j < drawKeys.length; j++){
			if(unit.getElementsByClassName(drawKeys[j]) != null){
				if(drawKeys[j] == "rotateOffset")
					unit.getElementsByClassName(drawKeys[j])[0].checked = unitSettings["drawSettings"][drawKeys[j]];
				else
					unit.getElementsByClassName(drawKeys[j])[0].value = unitSettings["drawSettings"][drawKeys[j]];
			}
		}
		const layoutKeys = Object.keys(unitSettings["layoutSettings"]);
		for(let j = 0; j < layoutKeys.length; j++){
			if(unit.getElementsByClassName(layoutKeys[j]) != null){
				if(Array.isArray(unitSettings["layoutSettings"][layoutKeys[j]]))
					for(let k = 0; k < unitSettings["layoutSettings"][layoutKeys[j]].length; k++)
						unit.getElementsByClassName(layoutKeys[j])[k].value = unitSettings["layoutSettings"][layoutKeys[j]][k];
				else
					unit.getElementsByClassName(layoutKeys[j])[0].value = unitSettings["layoutSettings"][layoutKeys[j]];
			}
		}
	}
}

function save() {		//保存処理
	let unitList = document.getElementsByClassName("unit");
	let unitSettings = [];
	for(let i = 0; i < unitList.length; i++){
		let unit = unitList[i];
		let setting = {};
		setting["memo"] = unit.getElementsByClassName("memo")[0].value;
		setting["align"] = unit.getElementsByClassName("align")[0].value;
		setting["drawType"] = unit.getElementsByClassName("drawType")[0].value;
		
		if(unit.getElementsByClassName("drawType")[0].value == "comment"){
			setting["charSettings"] = {};
			setting["layoutSettings"] = {};
		}else{
			switch(unit.getElementsByClassName("drawType")[0].value){
				case "char":
					setting["drawSettings"] = {
						"char":unit.getElementsByClassName("char")[0].value,
						"color":unit.getElementsByClassName("color")[0].value,
						"size":unit.getElementsByClassName("size")[0].value,
						"scale":unit.getElementsByClassName("scale")[0].value,
						"rotate":unit.getElementsByClassName("rotate")[0].value,
						"rotateOffset":unit.getElementsByClassName("rotateOffset")[0].checked
					};
					break;
				case "line":
					setting["drawSettings"] = {
						"width":unit.getElementsByClassName("width")[0].value,
						"color":unit.getElementsByClassName("color")[0].value
					};
					break;
			}
			setting["layoutType"] = unit.getElementsByClassName("layoutType")[0].value;
			switch(unit.getElementsByClassName("layoutType")[0].value){
				case "char":
					setting["layoutSettings"] = {
						"pos":[unit.getElementsByClassName("pos")[0].value,unit.getElementsByClassName("pos")[1].value]
					};
					break;
					
				case "circle":
					setting["layoutSettings"] = {
						"division":unit.getElementsByClassName("division")[0].value,
						"radius":unit.getElementsByClassName("radius")[0].value,
						"pos":[unit.getElementsByClassName("pos")[0].value,unit.getElementsByClassName("pos")[1].value],
						"angle":unit.getElementsByClassName("angle")[0].value
					};
					break;
					
				case "circle2":
					setting["layoutSettings"] = {
						"division":unit.getElementsByClassName("division")[0].value,
						"radius":unit.getElementsByClassName("radius")[0].value,
						"pos":[unit.getElementsByClassName("pos")[0].value,unit.getElementsByClassName("pos")[1].value],
						"angle":[unit.getElementsByClassName("angle")[0].value,unit.getElementsByClassName("angle")[1].value]
					};
					break;
					
				case "line":
					setting["layoutSettings"] = {
						"division":unit.getElementsByClassName("division")[0].value,
						"pos":[unit.getElementsByClassName("pos")[0].value,unit.getElementsByClassName("pos")[1].value,
								unit.getElementsByClassName("pos")[2].value,unit.getElementsByClassName("pos")[3].value]
					};
					break;
			}
		}
		unitSettings.push(setting);
	}
	let json = {
		"font":document.getElementById("font").value,
		"valign":document.getElementById("valign").value,
		"unitSettings":unitSettings
	};
    const url = URL.createObjectURL(new Blob([JSON.stringify(json, null, 2)], { type: "application/json" }));	//保存用URL発行
    let name = document.getElementById("saveName").value;	//ファイル名設定
    if(name === "" || name == null)
		name = "labelCode";
    a.download = name;	//<a>の設定を更新
    a.href = url;
    a.click();			//ダウンロード実行
    URL.revokeObjectURL(url); //保存用URL破棄
}


function init(){
	var charList = document.getElementById("charList");
	const keys = Object.keys(charDataList);
	for(let i = 0; i < keys.length; i++)
		charList.innerHTML +="<option value=\"" + keys[i] + "\">";
	unitAdd();	//読み込み時に要素を一つ配置
}
init();
