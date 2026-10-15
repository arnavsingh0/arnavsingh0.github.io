import AppKit
import Foundation

let input = CommandLine.arguments[1]
let output = CommandLine.arguments[2]
let url = URL(fileURLWithPath: input)

guard let image = NSImage(contentsOf: url),
      let tiff = image.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff),
      let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.88]) else {
    fputs("Could not read \(input)\n", stderr)
    exit(1)
}

do {
    try data.write(to: URL(fileURLWithPath: output))
} catch {
    fputs("\(error)\n", stderr)
    exit(1)
}
