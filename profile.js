
document.addEventListener('DOMContentLoaded', () => {
    const userInfoDisplay = document.getElementById('userInfoDisplay');
    const loggedInUserJson = sessionStorage.getItem('loggedInUser');

    if (!loggedInUserJson) {
        userInfoDisplay.innerHTML = `<div class="alert alert-danger text-center">Bu sayfayı görüntülemek için giriş yapmalısınız. <a href="login.html" class="alert-link">Giri sayfasna git</a></div>`;
        return;
    }

    const user = JSON.parse(loggedInUserJson);

    function getAppointments(email) {
        const apps = localStorage.getItem('userAppointments');
        if (!apps) return [];
        const allAppointments = JSON.parse(apps);
        return allAppointments.filter(app => app.userId === email);
    }

    const userAppointments = getAppointments(user.email);

    const appointmentListHTML = userAppointments.length > 0
        ? `
<div class="table-responsive">
 <table class="table table-bordered table-hover">
 <thead class="bg-primary text-white">
 <tr>
              <th>Tarih</th>
              <th>Saat</th>
              <th>Avukat</th>
              <th>Uzmanlık Alanı</th>
            </tr>
          </thead>
          <tbody>
            ${userAppointments.map(app => `
              <tr>
                <td>${app.date}</td>
                <td>${app.time}</td>
                <td>${app.lawyer.split('(')[0].trim()}</td>
                <td>${app.area}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
        : `<div class="alert alert-info text-center">Randevunuz bulunmamaktadr. Hemen Randevu Alın!</div>`;


    userInfoDisplay.innerHTML = `
<h2 class="mt-4 mb-4 text-primary"><i class="fa fa-calendar-check mr-2"></i> Randevularm (${userAppointments.length})</h2>
 ${appointmentListHTML}

<h2 class="mt-5 mb-4 text-primary"><i class="fa fa-user-circle mr-2"></i> Profil Bilgileri</h2>

 <div class="table-responsive">
 <table class="table table-bordered table-hover">

<thead class="bg-primary text-white">
<tr>
 <th>Ad Soyad</th> 
 <th>E-posta </th> 
</tr>
 </thead>

<tbody>
 <tr>
<td>${user.name || 'Belirtilmemiş'}</td>
<td>${user.email || 'Belirtilmemiş'}</td> 
 </tr>

 </tbody>
 </table>
 </div>

<div class="alert alert-warning mt-4">
<a href="randevu-al.html" class="alert-link">Yeni Randevu Oluşturmak için Tıklayın.</a>
 </div>
 `;
});