class TinyParser {
    nextToken(pointer, tokens){
        if(pointer.val < tokens.length){
            pointer.val++;
            return tokens[pointer.val-1];
        }else{
            return null;
        }
    }

    parse(tokens){
        // pointer to keep track of where we are in the tokens
        let p = {val:0};
        let token = this.nextToken(p, tokens);
        while(token != null){
            console.log(token);
            token = this.nextToken(p, tokens);
        }
    }
}