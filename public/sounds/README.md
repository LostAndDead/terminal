# Audio Files for Terminal Commands

This directory contains audio files used by the `play` command.

## Required Files

To use the `play` command, add the following audio files to this directory:

- `beep.mp3` - Classic system beep sound
- `chime.mp3` - Pleasant notification chime
- `click.mp3` - Mouse click sound
- `type.mp3` - Typewriter sound
- `error.mp3` - Error notification sound
- `success.mp3` - Success notification sound

## Supported Formats

The browser's HTML5 Audio API supports:
- MP3 (.mp3) - Recommended for best compatibility
- WAV (.wav) - Good quality, larger file size
- OGG (.ogg) - Good compression, not supported in Safari
- M4A (.m4a) - Good quality, supported in most modern browsers

## File Size Recommendations

For terminal sound effects, keep files small:
- Duration: 0.5-3 seconds
- File size: Under 100KB each
- Bitrate: 128kbps is sufficient for short sound effects

## Usage

Once you've added the audio files, you can use them with:

```
play beep
play chime
play success
```

## Finding Audio Files

You can find free sound effects at:
- Freesound.org (requires attribution for some sounds)
- Zapsplat.com (free with registration)
- BBC Sound Effects Library
- Or create your own using tools like Audacity