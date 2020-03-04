# Configuration object

The construction parameter of Lvp is a configuration object called lvp Option. Configuration information can be passed in when creating the lvp instance object, which affects the behavior of the lvp instance object.

## defaultSuccessMessage

- Type: `string`
- Default: `Verification succeeded`

The default verification success prompt.

## defaultErrorMessage

- Type: `string`
- Default: `verification failed`

The default verification failure prompt.

## rules

- Type: `Array`
- Default: `[]`

Custom validation logic list. There are two formats for the elements of an array. The first is a named function and the second is an object.
