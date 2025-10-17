import XCTest
import SwiftTreeSitter
import TreeSitterMips

final class TreeSitterMipsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_ic10())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Stationeers MIPS grammar")
    }
}
