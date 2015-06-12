/*

Original idea by : Krasimir Tsonev
http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line

*/

var Template = {
	do: function(tpl, options)
	{
		var re = /\{\{([^\}\}]+)?\}\}/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
		var add = function(line, js) {
		    js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
		        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		    return add;
		}
		while(match = re.exec(tpl)) {
		    add(tpl.slice(cursor, match.index))(match[1], true);		    
		    cursor = match.index + match[0].length;
		}
		add(tpl.substr(cursor, tpl.length - cursor));
		code += 'return r.join("");';
		return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
	}
}

//Exemplo :D
var data = Template.do("ola {{this.nome}}, voce tem {{this.idade}} anos!", {nome: 'Vinícius', idade: '26'});
console.log(data);