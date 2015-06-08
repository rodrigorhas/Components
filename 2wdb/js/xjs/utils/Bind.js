function bind( bindTo ) {
    // I'll omit parameter validation here.
    
    Object.defineProperty(this, 'value', {
        get : function ( ) {
            return bindTo.value;
        },
        set : function ( val ) {
            bindTo.value = val;
        }
    });
}