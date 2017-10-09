
export default function (msg) {
  if (msg instanceof Error) {
    return {
      msg: msg.toString()
    }
  } else if (typeof msg === 'object') {
    return msg
  }
  return {
    msg: msg
  }
}
