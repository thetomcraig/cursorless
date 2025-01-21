"""
DEPRECATED @ 2024-12-21
This file allows us to use a custom `number_small` capture.  See #1021 for more info.
"""

from talon import Module, app, registry

mod = Module()

mod.tag("cursorless_custom_number_small", "DEPRECATED!")


def on_ready():
    if "user.cursorless_custom_number_small" in registry.tags:
        print(
            "WARNING tag: 'user.cursorless_custom_number_small' is deprecated and should not be used anymore, as Cursorless now uses community number_small"
        )


<<<<<<< HEAD:src/number_small.py
digit_list = "zero one two three four five six seven eight nine".split()
teens = "ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
tens = "twenty thirty forty fifty sixty seventy eighty ninety".split()

number_small_list = [*digit_list, *teens]
for ten in tens:
    number_small_list.append(ten)
    number_small_list.extend(f"{ten} {digit}" for digit in digit_list[1:])
number_small_map = {n: i for i, n in enumerate(number_small_list)}

mod.list("private_cursorless_number_small", desc="List of small numbers")
ctx.lists["self.private_cursorless_number_small"] = number_small_map.keys()


@ctx.capture(
    "user.private_cursorless_number_small",
    rule="{user.private_cursorless_number_small}",
)
def override_private_cursorless_number_small(m) -> int:
    return number_small_map[m.private_cursorless_number_small]
=======
app.register("ready", on_ready)
>>>>>>> upstream/main:cursorless-talon/src/number_small.py
