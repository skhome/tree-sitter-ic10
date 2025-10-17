const fs = require('fs')
const ops = fs.readFileSync('./data/operations.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)
const constants = fs.readFileSync('./data/constants.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)
const logictypes = fs.readFileSync('./data/logictypes.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)
const slottypes = fs.readFileSync('./data/slottypes.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)
const batchmodes = fs.readFileSync('./data/batchmodes.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)
const reagentmodes = fs.readFileSync('./data/reagentmodes.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)
const enums = fs.readFileSync('./data/enums.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)
const deprecated = fs.readFileSync('./data/deprecated.txt').toString().split("\n").map((op) => op.trim()).filter((op) => !!op)

module.exports = grammar({
  name: "ic10",

  extras: $ => [$._whitespace],

  conflicts: $ => [
    [$.logictype, $.slottype],
    [$.logictype, $.batchmode],
  ],

  rules: {
    program: $ => repeat($.line),

    line: $ => seq(
      optional(choice($.const, $.alias, $.label, $.instruction)),
      optional($.comment),
      $._newline,
    ),

    comment: $ => /#.*/,

    const: $ => prec(5, seq('define', field('name', $.identifier), field('value', $.value))),
    alias: $ => prec(5, seq('alias', field('name', $.identifier), field('reference', choice($.register, $.device_spec, $.identifier)))),
    label: $ => seq(field('name', $.identifier), ":"),
    instruction: $ => seq(field('operation', choice($.operation, alias($.identifier, $.invalid_instruction))), repeat(field('operand', $.operand))),
    operation: $ => choice(...ops),
    operand: $ => choice($.register, $.device_spec, $.value, $.property, $.identifier),

    value: $ => choice($.enum, $.hash, $.const_builtin, $.number),
    enum: $ => token(prec(5, choice(...enums))),
    hash: $ => prec(5, seq('HASH(', field('string', $.hash_string), ')')),
    hash_string: $ => seq('"', /[^"]*/, '"'),
    const_builtin: $ => choice(...constants),
    number: $ => /-?[0-9]+/,
    register: $ => prec(5, choice('ra', 'sp', seq('r', /[0-9]|1[0-7]/))),
    device_spec: $ => seq($.device, optional(seq(':', $.network_index))),
    device: $ => token(prec(5, seq('d', choice('b', /[0-5]/, seq(repeat1('r'), /[0-9]|1[0-7]/))))),
    network_index: $ => /[0-9]+/,
    identifier: $ => /[a-zA-Z_.][a-zA-Z_.]*/,

    property: $ => prec(5, choice(
      $.logictype, $.slottype, $.batchmode, $.reagentmode, $.deprecated
    )),
    logictype: $ => choice(...logictypes),
    slottype: $ => choice(...slottypes),
    batchmode: $ => choice(...batchmodes),
    reagentmode: $ => choice(...reagentmodes),
    deprecated: $ => token(prec(5, choice(...deprecated))),

    _newline: $ => choice('\n', '\r\n', '\r'),
    _whitespace: $ => /[ \t]+/
  }
});



//     source_file: $ => alias(repeat($.line), $.program),
//
//     line: $ => seq(
//       optional(choice($.instruction, $.label)),
//       optional($.comment),
//       $.newline,
//     ),
//     label: $ => seq($.identifier, ":"),
//     instruction: $ => seq(
//       field('operation', choice($.operation, alias($.identifier, $.invalid_instruction))),
//       repeat(field('operand', $.operand)),
//     ),
//     operand: $ => choice($.register, $.device_spec, $.number, $.property, $.identifier),
//     register: $ => token(prec(5, choice(
//       'ra',
//       'sp',
//       seq(repeat1('r'), /[0-9]|1[0-7]/),
//     ))),
//
//     network_index: $ => /[0-9]+/,
//
//     device_spec: $ => seq(
//       $.device,
//       optional(seq(':', $.network_index)),
//     ),
//
//     device: $ => token(prec(5, seq(
//       'd',
//       choice(
//         'b',
//         /[0-5]/,
//         seq(
//           repeat1('r'),
//           /[0-9]|1[0-7]/
//         )
//       ),
//     ))),
//
//     preproc_string: $ => /[^"\n]*/,
//
//     hash_preproc: $ => seq(
//       "HASH(\"",
//       field('string', $.preproc_string),
//       "\")",
//     ),
//
//     number: $ => choice(
//       token(
//         choice(
//           seq(
//             optional('-'),
//             /[0-9]+/,
//             optional(seq(
//               '.',
//               /[0-9]+/
//             ))
//           ),
//           seq("%", /[01_]+/),
//           seq("$", /[0-9a-fA-F_]+/),
//         ),
//       ),
//       $.constant,
//       $.hash_preproc,
//       $.enum
//     ),
//
//     property: $ => prec(5, choice(
//       $.logictype, $.logicslottype, $.batchmode, $.reagentmode, $.deprecated
//     )),
//
//     operation: $ => choice(...ops),
//
//     constant: $ => choice(...constants),
//
//     logictype: $ => prec(6, choice(...logictypes)),
//
//     logicslottype: $ => choice(...slottypes),
//
//     batchmode: $ => choice(...batchmodes),
//
//     reagentmode: $ => choice(...reagentmodes),
//
//     enum: $ => token(prec(5, choice(...enums))),
//
//     deprecated: $ => token(prec(5, choice(...deprecated)))
