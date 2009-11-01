# iTunes Emulator

iTunes Emulator is piece of JavaScript code that can help when developing iTunes LP and iTunes Extras content. It allows you to test many features which are part of the <code>window.iTunes</code> right in your browser.

## Browser/OS Compatibility

This is developed on a Mac with Snow Leopard, but should work on any computer with Safari 4 or newer. There is little point in making it compatible with other browsers since iTunes' browser is based on WebKit.

## Usage

You can use the emulator by including the iTunesEmulator.js in your iTunes LP or iTunes Extras project and referencing the JavaScript file from your HTML. To properly function you also need to tell the emulator where it can find the XML export of your iTunes Library. This XML file is written to your iTunes folder every time you exit iTunes. You can copy all the required code from the provided index.html.

## Emulation Compatibility

Not every feature of the <code>window.iTunes</code> object is supported. We don't even know what some of the features do. This project will however evolve and hopefully over time it will support everything that you need to easily develop your iTunes LP and iTunes Extras content.
