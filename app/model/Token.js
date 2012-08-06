Ext.define("NotesApp.model.Token", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: 'token', type: 'string' },
        ],
        validations: [
            { type: 'presence', field: 'token' },
        ]
    }
});


