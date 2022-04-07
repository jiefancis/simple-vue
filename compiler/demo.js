// 解析
// 解析{{}}双括号语法为ast，ast genCode生成模板字符串，借助new Function执行代码
function parser(str) {
    const ast = []
    let start = 0, end = str.length;

    
    const genChar = (ast, type) => {
        let last = ast[ast.length - 1]
        if(last?.type === type) {
            last = ast.pop()

            ast.push({
                type,
                start: last?.start || 0,
                end: start + 1,
                content: str.substring(last?.start, start + 1)
            })
        } else {
            ast.push({
                type,
                start,
                end: start + 1,
                content: str.substring(start, start+1)
            })
        }
        start++
    }
    // 一个字符一个字符的解析
    while(start < end) {
        const startIndex = str.indexOf('{{')
        const endIndex = str.indexOf('}}')

        // {{前的内容
        if(start < startIndex) {
            genChar(ast, COMPILER_TYPE.CHAR)
        } else if(start === startIndex) { // {{
            ast.push({
                type: 'templateStart',
                content: '{{',
                start,
                end: start+2
            })

            start += 2
        } else if(start === endIndex) { // }}
            ast.push({
                type: 'templateEnd',
                content: '}}',
                start,
                end: start + 2
            })

            start += 2

            str = str.substring(start)
            start = 0
            end = str.length
            continue
        } else if(start > startIndex && start < endIndex) { // {{ }}双括号内的内容
            genChar(ast, COMPILER_TYPE.CONTENT)
        }
    }
    return ast
}
// 生成代码
function genCode(ast) {
    let cstr = ''
    for(let i = 0; i < ast.length; i++) {
        switch(ast[i].type) {
            case COMPILER_TYPE.CHAR:
                cstr += ast[i].content
                break;
            case COMPILER_TYPE.CONTENT:
                cstr += '${' + ast[i].content + '}'
                break
        }
    }
    // 转换成模板字符串
    `return  \`${cstr}\``
}
// 解析
const COMPILER_TYPE = {
    CHAR: 'char',
    CONTENT: 'content'
}
var str = 'star {{ obj.a}} aadaf {{obj.b }}'
var obj = {
    a: 1,
    b: 2,
    c:3
}
var ast = parser(str)
var code = genCode(ast)

console.log(new Function('obj', 'str', code)(obj, cstr))