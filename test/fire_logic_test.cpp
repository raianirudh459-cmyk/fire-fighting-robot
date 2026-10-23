#include <cassert>
#include <iostream>
#include "../src/fire_logic.h"

int main() {
  using forest::AlertLevel;
  using forest::evaluate;
  using forest::maySpray;

  assert(evaluate(false, 25.0f, 42.0f, false, false) == AlertLevel::READY);
  assert(evaluate(true, 25.0f, 42.0f, false, false) == AlertLevel::CAUTION);
  assert(evaluate(false, 43.0f, 42.0f, false, false) == AlertLevel::CAUTION);
  assert(evaluate(true, 45.0f, 42.0f, true, false) == AlertLevel::CONFIRMED);
  assert(evaluate(false, 25.0f, 42.0f, false, true) == AlertLevel::CONFIRMED);
  assert(!maySpray(AlertLevel::READY, false));
  assert(!maySpray(AlertLevel::CAUTION, false));
  assert(maySpray(AlertLevel::CONFIRMED, false));
  assert(!maySpray(AlertLevel::CONFIRMED, true));
  std::cout << "PASS: 9 logic assertions" << std::endl;
  return 0;
}
