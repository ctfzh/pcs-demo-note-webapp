/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('WebNoteDemo.view.NoteEditor', {
    extend: 'Ext.form.Panel',
    xtype: 'editor',
    
//    requires: [
//        'WebNoteDemo.view.NoteContent'
//    ],
    
    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'create',
                items: [
                    {
                        xtype: 'button',
                        id: 'btn-back-note',
                        ui: 'back',
                        text: 'home',
                        handler: function () {
                         
                           Ext.Viewport.setActiveItem({ xtype: 'notecontent'},{type:'slide',direction:'right'});
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn-save-note',
                        ui: 'action',
                        text: 'save',
                        
                        handler: function () {
                         
                           Ext.Viewport.setActiveItem({ xtype:  'notecontent'},{type:'slide',direction:'right'});
                        }
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'trash',
                        iconMask: true,
                        text: '',
                        
                        handler: function () {
                         
                           Ext.Viewport.setActiveItem({ xtype:  'notecontent'},{type:'slide',direction:'right'});
                        }
                    }
                ]
            },
            {
                xtype: 'textfield',
                label: 'name:',
                labelWidth: 0
            },
            {
                xtype: 'spacer',
                height: 26,
                width: 281
            },
            {
                xtype: 'textareafield',
                label: ''
            },
            {
                xtype: 'spacer',
                docked: 'bottom',
                height: 10,
                width: 286
            }
        ]
    }

});






