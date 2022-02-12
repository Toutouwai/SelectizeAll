# Selectize All

Enables Selectize on all InputfieldSelect and InputfieldAsmSelect fields in the ProcessWire admin.

The module activates Selectize on the `<select>` element when it is focused, and destroys Selectize when the element is blurred. This allows Selectize to work on selects where the options are changed dynamically after page load depending on other field values, e.g. the "Select File" field in the CKEditor link modal or a dependent select in Page Edit.

Only AdminThemeUikit is tested and supported.

![selectize-select](https://user-images.githubusercontent.com/1538852/153692133-645ed871-6036-49cc-b6f4-3f3bcfe6049a.gif)

![selectize-asm](https://user-images.githubusercontent.com/1538852/153692139-9a648182-9894-49f8-92c9-117520160998.gif)

## Usage

In the module config you can choose if Selectize should be used with InputfieldSelect, InputfieldAsmSelect, or both.

If you want to disable the module for a specific Select or AsmSelect inputfield you can hook `SelectizeAll::allowSelectize`. This method receives the Inputfield object as the first argument.

Example:

```php
$wire->addHookAfter('SelectizeAll::allowSelectize', function(HookEvent $event) {
    $inputfield = $event->arguments(0);
    // You can also get any associated Page and Field objects via $inputfield->hasPage and $inputfield->hasField

    // Disable the module for the inputfield named "template"
    if($inputfield->name === 'template') $event->return = false;
});
```
