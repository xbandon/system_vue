const filter = {
    dateFormat: function (date, format) {
        if (date == null || date === '') {
            return '';
        } else {
            const dt = new Date(date);
            if (format === 'yyyy-MM-dd') {
                let year = dt.getFullYear();
                let month = (dt.getMonth() + 1).toString().padStart(2, '0');
                let day = dt.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
        }
    }

}

export default filter