import type { Range, TextEditor } from "@cursorless/common";
import type { TextualType } from "../../typings/target.types";
import { tryConstructTarget } from "../../util/tryConstructTarget";
import type { CommonTargetParameters } from "./BaseTarget";
import { BaseTarget } from "./BaseTarget";

interface PlainTargetParameters extends CommonTargetParameters {
  readonly textualType?: TextualType;
  readonly insertionDelimiter?: string;
}

/**
 * A target that has no leading or trailing delimiters so it's removal range
 * just consists of the content itself. Its insertion delimiter is empty string,
 * unless specified.
 */
export class PlainTarget extends BaseTarget<PlainTargetParameters> {
  type = "PlainTarget";
  insertionDelimiter: string;

  constructor(parameters: PlainTargetParameters) {
    super(parameters);
    this.textualType = parameters.textualType ?? "token";
    this.insertionDelimiter = parameters.insertionDelimiter ?? "";
  }

  getLeadingDelimiterTarget = () => undefined;
  getTrailingDelimiterTarget = () => undefined;
  getRemovalRange = () => this.contentRange;

  protected getCloneParameters() {
    return {
      ...this.state,
      textualType: this.textualType,
      insertionDelimiter: this.insertionDelimiter,
    };
  }
}

/**
 * Constructs a {@link PlainTarget} from the given range, or returns undefined
 * if the range is undefined
 * @param editor The editor containing the range
 * @param range The range to convert into a target
 * @param isReversed Whether the rain should be backward
 * @returns A new {@link PlainTarget} constructed from the given range, or null
 * if the range is undefined
 */
export function tryConstructPlainTarget(
  editor: TextEditor,
  range: Range | undefined,
  isReversed: boolean,
): PlainTarget | undefined {
  return tryConstructTarget(PlainTarget, editor, range, isReversed);
}
