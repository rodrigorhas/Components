(function(){window.Template={"do":function(e,n){for(var r,t=/\{\{([^\}\}]+)?\}\}/g,a=/(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,c="var r=[];\n",i=0,u=function(e,n){return c+=n?e.match(a)?e+"\n":"r.push("+e+");\n":""!=e?'r.push("'+e.replace(/"/g,'\\"')+'");\n':"",u};r=t.exec(e);)u(e.slice(i,r.index))(r[1],!0),i=r.index+r[0].length;return u(e.substr(i,e.length-i)),c+='return r.join("");',new Function(c.replace(/[\r\t\n]/g,"")).apply(n)}};})();