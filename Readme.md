## Global browser hotkeys

This module integrates the `hotkeysModule` directly into the `document` object and provides a simple way to register hotkey combinations.

### Usage
* Import the library

```
    <script src="global-hotkeys/index.js"></script>
```

* Check if the module is registered in the `document` object.

```
    const { hotkeyModule } = document;
    if(!hotkeyModule) console.error('no hotkey module was registered on document');
```

* Setup options:

```
    hotkeyModule.options.debug = true; // default false, turns on extra logs
    hotkeyModule.options.autoRewrite = true; // replace previously registered hotkey if the combination is repeated
```

* Register hotkeys:

```
    hotkeyModule.createHotkey('ctrl+meta+j', console.log, [1,2,3]);
    or
    hotkeyModule.createHotkey(['ctrl','meta','j'], console.log, [1,2,3]);
```

### createHotkey

createHotkey(combination: Array<string> | string, handler: Action, args?: Array<any>, context?: Object): void
* combination - Array of keys triggering hokey. Available modifier keys: shift, alt, meta, ctrl
* action - link to the function, to be executed for the hotkey
* args - array of arguments to be passed to the action handler (*optional*, default is [])
* context - this context to be bound to the action (*optional*, default is *window*)

### Examples

Simple example of the usage can be found in `example` folder