// บันทึกว่าทำ Oncoarding เสร็จแล้ว
export async function completeOnboarding(userData = {}) {
    // test
    localStorage.setItem('hasOnboarded', 'true');
}

//  เคยทำ Onboarding หรือยัง
export async function checkHasOnboarded() {
    // test
    return localStorage.getItem('hasOnboarded') === 'true';
}

// ล้างค่าเพื่อกด test Onboarding
export async function resetOnboarding() {
    localStorage.removeItem('hasOnboarded')
    localStorage.removeItem('has_seen_goals_popup')
}