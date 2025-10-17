; comments
(comment)@comment

; keywords
"define" @keyword
"alias" @keyword

; labels
(label name: (identifier)) @label

; operations and variables
(operation) @function
(identifier) @variable

; aliases and constants
(const name: (identifier) @constant)
(alias name: (identifier) @variable)

; functions
(hash) @function.macro
(hash string: (hash_string) @string)

; properties and values
(property) @property
(enum) @type
(const_builtin) @constant.builtin
(number) @number.float

; registers and devices
(register) @variable.parameter
(device) @variable.builtin
