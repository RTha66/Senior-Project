// บันทึกว่าทำ Onboarding เสร็จแล้ว
export async function completeOnboarding(userData = {}) {
    // test
    localStorage.setItem('hasOnboarded', 'true');
    // เชื่อมและส่งข้อมูลเพื่อไปเก็บใน db
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