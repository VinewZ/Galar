import { ModeENUM } from "@src/atoms/appModes"

export function Commands() {

  return (
    <div>
    {
      Object.values(ModeENUM).map((key) => {
        return (
          <div key={key}>
            {key}
          </div>
        )
      })
    }
    </div>
  )
}
