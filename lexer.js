class TinyLexer {

    lex(input){
        let tokens = [];
        let curr = 0;

        // symbols
        const symmap = new Map([
            ["+", "PLUS"],
            ["-", "MINUS"],
            ["*", "TIMES"],
            ["/", "DIVIDE"],
            [",", "COMMA"],
            [";", "SEMI"],
            ["(", "LPAREN"],
            [")", "RPAREN"],
            [":=", "CEQUAL"],
            ["!=", "NEQUAL"],
            ["==", "IFEQUAL"],
        ]);

        // keywords
        const kwmap = new Map([
            ["WRITE", "WRITE"],
            ["READ", "READ"],
            ["IF", "IF"],
            ["ELSE", "ELSE"],
            ["RETURN", "RETURN"],
            ["BEGIN", "BEGIN"],
            ["END", "END"],
            ["MAIN", "MAIN"],
            ["STRING", "STRING"],
            ["INT", "INT"],
            ["REAL", "REAL"],
            ["TRUE", "TRUE"],
            ["FALSE", "FALSE"],
        ]);

        // regular expressions
        const regmap = new Map([
            [/\"[^\"]*\"/g, "QSTRING"],
            [/[a-zA-Z][a-zA-Z0-9]*/g, "ID"],
            [/[0-9]+(\.[0-9]+)?/g, "NUMBER"]
        ]) 
    
        while(curr < input.length){
            let char = input[curr];


            let found=false;

            // checking symbols
            for(let key of symmap.keys()){
                if(input.slice(curr, curr+key.length) == key){
                    curr+=key.length;
                    tokens.push({type:symmap.get(key), value:key});
                    found=true;
                    break;
                }
            }
            
            if(found){
                continue;
            }

            // checking keywords
            for(let key of kwmap.keys()){
                if(input.slice(curr, curr+key.length) == key){
                    // checking that this really is the end of a keyword
                    if(['', ' ', '\r', '\n', '\t', ',', ';', '(', ')', '+', '-', '*', '/', ':', '!'].includes(input.slice(curr+key.length, curr+key.length+1))){
                        console.log(`===\n${key} => |${input.slice(curr+key.length, curr+key.length+1)}|\n===`);
                        curr+=key.length;
                        tokens.push({type:kwmap.get(key), value:key});
                        found=true;
                        break;   
                    }
                }
            }
            
            if(found){
                continue;
            }

            // checking regular expressions
            for(let key of regmap.keys()){
                let match = key.exec(input.slice(curr));
                key.lastIndex = 0;
                
                if(match == null){
                    continue;
                }

                // proper match
                if (match.index == 0){
                    curr+=match[0].length;
                    tokens.push({type:regmap.get(key), value:match[0]});
                    found=true;
                    break;
                }
            }

            if(found){
                continue;
            }

            // throwing away whitespace
            if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
                curr++;
                continue;
            }

            // if nothing else matches we get an error
            tokens.push({type:"ERROR", value:input[curr]});
            curr++;
       }
       return tokens;
    }
}