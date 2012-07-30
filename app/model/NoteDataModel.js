/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('WebNoteDemo.model.NoteDataModel', {
    extend: 'Ext.data.Model',
    config: {
       idProperty: 'id',
       
       fields: [
                { name: 'id', type: 'int' },
                { name: 'date', type: 'date', dateFormat: 'c' },
                { name: 'title', type: 'string' },
                { name: 'narrative', type: 'string' }
            ],
      validations: [
                { type: 'presence', field: 'id' },
                { type: 'presence', field: 'title', message: 'Please enter a title for this note.' }
            ]
    }
    
});



