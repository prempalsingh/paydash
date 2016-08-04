'use strict';

exports.overview = function(USER_ID, ROLE) {
    if (ROLE === 'block') {
        return "SELECT a.region_code, a.region_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id='"+USER_ID+"') a LEFT JOIN (SELECT count(*) AS current_total, block_code AS region_code FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY region_code) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, block_code AS region_code FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY region_code) c ON a.region_code = c.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, block_code AS region_code FROM block_delays_duration WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code) d ON a.region_code = d.region_code;";
    } else if (ROLE === 'district') {
        return "SELECT a.region_code, a.region_name, IFNULL(b.current_total,0) AS current_total, IFNULL(c.delayed_total,0) AS delayed_total, IFNULL(d.days_to_payment,'No Data') AS days_to_payment FROM (SELECT region_code, region_name FROM user_regions WHERE user_id='"+USER_ID+"') a LEFT JOIN (SELECT count(*) AS current_total, b.district_code AS region_code FROM current_musters a RIGHT JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code = b.block_code GROUP BY region_code ) b ON a.region_code = b.region_code LEFT JOIN (SELECT count(*) AS delayed_total, b.district_code AS region_code FROM delayed_musters a RIGHT JOIN (SELECT district_code, block_code from blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code = b.block_code GROUP BY region_code ) c ON a.region_code = c.region_code LEFT JOIN (SELECT ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1) AS days_to_payment, district_code AS region_code FROM district_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY region_code) d ON a.region_code = d.region_code;";
    }
};

exports.cards = function(USER_ID, ROLE) {
    if (ROLE === 'block') {
        return "SELECT a.staff_id, IFNULL(a.name,'Unmapped') AS name, a.task_assign, IFNULL(a.mobile_no,'Unmapped') AS mobile_no, a.block_code, a.block_name, a.unmapped, b.active, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, b.msr_no, b.work_name, b.work_code, b.panchayat_name, b.end_date, b.days_pending, b.step, b.type FROM (SELECT staff_id, name, task_assign, mobile_no, block_code, block_name, 0 AS unmapped FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") UNION SELECT a.staff_id, a.name, a.task_assign, a.mobile_no, b.block_code, b.block_name, 1 AS unmapped FROM (SELECT NULL as staff_id, NULL as name, NULL as task_assign, NULL as mobile_no, 1 as merge) a RIGHT JOIN (SELECT region_code as block_code, region_name as block_name, 1 as merge FROM user_regions WHERE user_id="+USER_ID+") b ON a.merge = b.merge ) a LEFT JOIN (SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, NULL as days_pending, NULL AS step, 'current_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.map_location = b.panchayat_code UNION SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - 2) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='GRS') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t2') b ON a.map_location = b.panchayat_code UNION SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - 5) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='TA') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t5') b ON a.map_location = b.panchayat_code ) b ON a.staff_id=b.staff_id OR (a.staff_id IS NULL AND b.staff_id IS NULL AND a.block_code=b.block_code) LEFT JOIN (SELECT count(*) AS current_total, a.staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code ) c ON a.staff_id=c.staff_id OR (a.staff_id IS NULL AND c.staff_id IS NULL AND a.block_code=c.block_code) LEFT JOIN (SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='GRS') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t2') b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code UNION SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='TA') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t5') b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code ) d ON a.staff_id=d.staff_id OR (a.staff_id IS NULL AND d.staff_id IS NULL AND a.block_code=d.block_code) ORDER BY active DESC, unmapped, delayed_total DESC, current_total DESC, staff_id;" +
            "SELECT DISTINCT state_code FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"');";
    } else if (ROLE === 'district') {
        return "SELECT a.district_code, a.district_name, a.block_code, a.block_name, j.id, j.username, j.title, j.firstname, j.lastname, IFNULL(j.designation,'No Data') AS designation, IFNULL(j.mobile,'No Data') AS mobile, b.days_to_payment, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(e.t2_total,0) AS t2_total, IFNULL(e.t2_avg,'') AS t2_avg, IFNULL(f.t5_total,0) AS t5_total, IFNULL(f.t5_avg,'') AS t5_avg, IFNULL(g.t6_total,0) AS t6_total, IFNULL(g.t6_avg,'') AS t6_avg, IFNULL(h.t7_total,0) AS t7_total, IFNULL(h.t7_avg,'') AS t7_avg, IFNULL(i.t8_total,0) AS t8_total, IFNULL(i.t8_avg,'') AS t8_avg FROM (SELECT district_code, district_name, block_code, block_name FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a LEFT JOIN (SELECT block_code, IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment FROM block_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY block_code) b ON a.block_code=b.block_code LEFT JOIN (SELECT b.block_code, count(*) AS current_total FROM current_musters a RIGHT JOIN blocks b ON a.block_code=b.block_code AND b.district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") GROUP BY a.block_code) c ON a.block_code=c.block_code LEFT JOIN (SELECT b.block_code, count(*) AS delayed_total FROM delayed_musters a RIGHT JOIN blocks b ON a.block_code=b.block_code AND b.district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") GROUP BY a.block_code) d ON a.block_code=d.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t2_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 2),1) AS t2_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t2') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) e ON a.block_code=e.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t5_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 5),1) AS t5_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t5') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) f ON a.block_code=f.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t6_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 6),1) AS t6_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t6') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) g ON a.block_code=g.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t7_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 7),1) AS t7_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t7') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) h ON a.block_code=h.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t8_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 8),1) AS t8_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t8') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) i ON a.block_code=i.block_code LEFT JOIN (SELECT b.block_code, a.id, a.username, a.title, a.firstname, a.lastname, a.designation, a.mobile from users a RIGHT JOIN (SELECT a.user_id, b.block_code FROM user_regions a RIGHT JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.region_code = b.block_code) b ON a.id = b.user_id) j ON a.block_code=j.block_code;";
    }
};

exports.performance = function(USER_ID, ROLE) {
    if (ROLE === 'block') {
        return "SELECT state_code,state_name,SUM(total_transactions) tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM state_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.state_code IN (SELECT b.state_code FROM blocks b WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"')) GROUP BY YEAR(date), MONTH(date) ORDER BY date;" +
            "SELECT district_code,district_name,SUM(total_transactions) tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM district_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.district_code IN (SELECT b.district_code FROM blocks b WHERE b.block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"')) GROUP BY YEAR(date), MONTH(date) ORDER BY date;" + 
            "SELECT block_code, block_name,SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY YEAR(date), MONTH(date), block_code ORDER BY block_code, date;" +
            "SELECT block_code, block_name, panchayat_code, panchayat_name,SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY YEAR(date), MONTH(date), panchayat_code ORDER BY panchayat_code, date;";   
    } else if (ROLE === 'district') {
        return "SELECT state_code,state_name,SUM(total_transactions) tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM state_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.state_code IN (SELECT b.state_code FROM districts b WHERE b.district_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"')) GROUP BY YEAR(date), MONTH(date) ORDER BY date;" +
            "SELECT district_code, district_name,SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM district_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY YEAR(date), MONTH(date), district_code ORDER BY district_code, date;" +
            "SELECT district_code, district_name, block_code, block_name, SUM(total_transactions) AS tot_trn,YEAR(date) AS year, MONTH(date) AS month,ROUND(sum(mrc_mre_mean*total_transactions)/sum(total_transactions),0) mrc_mre,ROUND(sum(mre_wlg_mean*total_transactions)/sum(total_transactions),0) mre_wlg,ROUND(sum(wlg_wls_mean*total_transactions)/sum(total_transactions),0) wlg_wls,ROUND(sum(wls_fto_mean*total_transactions)/sum(total_transactions),0) wls_fto,ROUND(sum(fto_firstsign_mean*total_transactions)/sum(total_transactions),0) fto_sn1,ROUND(sum(firstsign_secondsign_mean*total_transactions)/sum(total_transactions),0) sn1_sn2,ROUND(sum(secondsign_processed_mean*total_transactions)/sum(total_transactions),0) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY YEAR(date), MONTH(date), block_code ORDER BY block_code, date;";
    }
};

exports.paydroid = function(USER_ID,ROLE,VERSION) {
    if (VERSION===1) {
        return "SELECT a.current_total, b.delayed_total, c.days_to_payment, c.total_transactions FROM (SELECT count(*) AS current_total, 1 AS merge FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"')) a LEFT JOIN (SELECT count(*) AS delayed_total, 1 AS merge FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"')) b ON a.merge = b.merge LEFT JOIN (SELECT IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment, IFNULL(SUM(total_transactions),0) AS total_transactions, 1 AS merge FROM block_delays_duration WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH)) c ON b.merge = c.merge;" +
            "SELECT a.staff_id, IFNULL(a.name,'Unmapped') AS name, a.task_assign, IFNULL(a.mobile_no,'Unmapped') AS mobile_no, a.block_code, a.block_name, a.unmapped, b.active, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, b.msr_no, b.work_name, b.work_code, b.panchayat_name, b.end_date, b.days_pending, b.step, b.type FROM (SELECT staff_id, name, task_assign, mobile_no, block_code, block_name, 0 AS unmapped FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") UNION SELECT a.staff_id, a.name, a.task_assign, a.mobile_no, b.block_code, b.block_name, 1 AS unmapped FROM (SELECT NULL as staff_id, NULL as name, NULL as task_assign, NULL as mobile_no, 1 as merge) a RIGHT JOIN (SELECT region_code as block_code, region_name as block_name, 1 as merge FROM user_regions WHERE user_id="+USER_ID+") b ON a.merge = b.merge ) a LEFT JOIN (SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, NULL as days_pending, NULL AS step, 'current_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.map_location = b.panchayat_code UNION SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - 2) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='GRS') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t2') b ON a.map_location = b.panchayat_code UNION SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - 5) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='TA') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t5') b ON a.map_location = b.panchayat_code ) b ON a.staff_id=b.staff_id OR (a.staff_id IS NULL AND b.staff_id IS NULL AND a.block_code=b.block_code) LEFT JOIN (SELECT count(*) AS current_total, a.staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code ) c ON a.staff_id=c.staff_id OR (a.staff_id IS NULL AND c.staff_id IS NULL AND a.block_code=c.block_code) LEFT JOIN (SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='GRS') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t2') b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code UNION SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='TA') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t5') b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code ) d ON a.staff_id=d.staff_id OR (a.staff_id IS NULL AND d.staff_id IS NULL AND a.block_code=d.block_code) ORDER BY active DESC, unmapped, delayed_total DESC, current_total DESC, staff_id;" +
            "SELECT block_code, block_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') ORDER BY block_code, date;" +
            "SELECT block_code, panchayat_code, panchayat_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code  IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') ORDER BY panchayat_code, date;" +
            "SELECT * FROM notifications WHERE user_id = '"+USER_ID+"';" + 
            "SELECT state_code FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY state_code;" +
            "SELECT * FROM contact;";
    } else if (VERSION===2) {
        if (ROLE==='block') {
            return "SELECT a.current_total, b.delayed_total, c.days_to_payment FROM (SELECT count(*) AS current_total, 1 AS merge FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"')) a LEFT JOIN (SELECT count(*) AS delayed_total, 1 AS merge FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"')) b ON a.merge = b.merge LEFT JOIN (SELECT IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment, 1 AS merge FROM block_delays_duration WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH)) c ON b.merge = c.merge;" +
                "SELECT a.staff_id, IFNULL(a.name,'Unmapped') AS name, a.task_assign, IFNULL(a.mobile_no,'Unmapped') AS mobile_no, a.block_code, a.block_name, a.unmapped, b.active, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, b.msr_no, b.work_name, b.work_code, b.panchayat_name, b.end_date, b.days_pending, b.step, b.type FROM (SELECT staff_id, name, task_assign, mobile_no, block_code, block_name, 0 AS unmapped FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") UNION SELECT a.staff_id, a.name, a.task_assign, a.mobile_no, b.block_code, b.block_name, 1 AS unmapped FROM (SELECT NULL as staff_id, NULL as name, NULL as task_assign, NULL as mobile_no, 1 as merge) a RIGHT JOIN (SELECT region_code as block_code, region_name as block_name, 1 as merge FROM user_regions WHERE user_id="+USER_ID+") b ON a.merge = b.merge ) a LEFT JOIN (SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, NULL as days_pending, NULL AS step, 'current_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.map_location = b.panchayat_code UNION SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - 2) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='GRS') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t2') b ON a.map_location = b.panchayat_code UNION SELECT a.staff_id, 1 AS active, b.block_code, b.msr_no, b.work_name, b.work_code, b.panchayat_name, DATE_FORMAT(b.end_date,'%d-%m-%Y') as end_date, (datediff(CURDATE(), b.end_date) - 5) AS days_pending, b.step, 'delayed_musters' AS type FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='TA') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t5') b ON a.map_location = b.panchayat_code ) b ON a.staff_id=b.staff_id OR (a.staff_id IS NULL AND b.staff_id IS NULL AND a.block_code=b.block_code) LEFT JOIN (SELECT count(*) AS current_total, a.staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a RIGHT JOIN (SELECT * FROM current_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code ) c ON a.staff_id=c.staff_id OR (a.staff_id IS NULL AND c.staff_id IS NULL AND a.block_code=c.block_code) LEFT JOIN (SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='GRS') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t2') b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code UNION SELECT count(*) AS delayed_total, staff_id, b.block_code FROM (SELECT * FROM employees WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND task_assign='TA') a RIGHT JOIN (SELECT * FROM delayed_musters WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND step='ds_t5') b ON a.map_location = b.panchayat_code GROUP BY staff_id, b.block_code ) d ON a.staff_id=d.staff_id OR (a.staff_id IS NULL AND d.staff_id IS NULL AND a.block_code=d.block_code) ORDER BY active DESC, unmapped, delayed_total DESC, current_total DESC, staff_id;" +
                "SELECT block_code, block_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') ORDER BY block_code, date;" +
                "SELECT block_code, panchayat_code, panchayat_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code  IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') ORDER BY panchayat_code, date;" +
                "SELECT state_code FROM blocks WHERE block_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY state_code;" +
                "SELECT * FROM contact;";
        } else if (ROLE=='district') {
            return "SELECT a.current_total, b.delayed_total, c.days_to_payment FROM (SELECT count(*) AS current_total, 1 AS merge FROM current_musters WHERE block_code IN (SELECT a.block_code FROM blocks a RIGHT JOIN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") b ON a.district_code = b.region_code)) a LEFT JOIN (SELECT count(*) AS delayed_total, 1 AS merge FROM delayed_musters WHERE block_code IN (SELECT a.block_code FROM blocks a RIGHT JOIN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") b ON a.district_code = b.region_code)) b ON a.merge = b.merge LEFT JOIN (SELECT IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment, 1 AS merge FROM district_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH)) c ON b.merge = c.merge;" +
                "SELECT a.district_code, a.district_name, a.block_code, a.block_name, j.id, j.username, j.title, j.firstname, j.lastname, IFNULL(j.designation,'No Data') AS designation, IFNULL(j.mobile,'No Data') AS mobile, IFNULL(b.days_to_payment,'No Data') AS days_to_payment, IFNULL(c.current_total,0) AS current_total, IFNULL(d.delayed_total,0) AS delayed_total, IFNULL(e.t2_total,0) AS t2_total, IFNULL(e.t2_avg,'') AS t2_avg, IFNULL(f.t5_total,0) AS t5_total, IFNULL(f.t5_avg,'') AS t5_avg, IFNULL(g.t6_total,0) AS t6_total, IFNULL(g.t6_avg,'') AS t6_avg, IFNULL(h.t7_total,0) AS t7_total, IFNULL(h.t7_avg,'') AS t7_avg, IFNULL(i.t8_total,0) AS t8_total, IFNULL(i.t8_avg,'') AS t8_avg FROM (SELECT district_code, district_name, block_code, block_name FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) a LEFT JOIN (SELECT block_code, IFNULL(ROUND(SUM(mrc_processed_mean * total_transactions) / SUM(total_transactions),1),'No Data') AS days_to_payment FROM block_delays_duration WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' and date>=DATE_SUB(now(), INTERVAL 3 MONTH) GROUP BY block_code) b ON a.block_code=b.block_code LEFT JOIN (SELECT b.block_code, count(*) AS current_total FROM current_musters a RIGHT JOIN blocks b ON a.block_code=b.block_code AND b.district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") GROUP BY a.block_code) c ON a.block_code=c.block_code LEFT JOIN (SELECT b.block_code, count(*) AS delayed_total FROM delayed_musters a RIGHT JOIN blocks b ON a.block_code=b.block_code AND b.district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") GROUP BY a.block_code) d ON a.block_code=d.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t2_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 2),1) AS t2_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t2') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) e ON a.block_code=e.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t5_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 5),1) AS t5_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t5') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) f ON a.block_code=f.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t6_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 6),1) AS t6_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t6') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) g ON a.block_code=g.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t7_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 7),1) AS t7_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t7') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) h ON a.block_code=h.block_code LEFT JOIN (SELECT b.block_code, count(*) AS t8_total, ROUND(AVG(datediff(CURDATE(), a.end_date) - 8),1) AS t8_avg FROM (SELECT * FROM delayed_musters WHERE step='ds_t8') a INNER JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.block_code=b.block_code GROUP BY b.block_code) i ON a.block_code=i.block_code LEFT JOIN (SELECT b.block_code, a.id, a.username, a.title, a.firstname, a.lastname, a.designation, a.mobile from users a RIGHT JOIN (SELECT a.user_id, b.block_code FROM user_regions a RIGHT JOIN (SELECT * FROM blocks WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+")) b ON a.region_code = b.block_code) b ON a.id = b.user_id) j ON a.block_code=j.block_code;" +
                "SELECT district_code, district_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM district_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') ORDER BY district_code, date;" +
                "SELECT block_code, block_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND district_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') ORDER BY block_code, date;" +
                "SELECT district_code, block_code, panchayat_code, panchayat_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,1) mrc_mre,ROUND(mre_wlg_mean,1) mre_wlg,ROUND(wlg_wls_mean,1) wlg_wls,ROUND(wls_fto_mean,1) wls_fto,ROUND(fto_firstsign_mean,1) fto_sn1,ROUND(firstsign_secondsign_mean,1) sn1_sn2,ROUND(secondsign_processed_mean,1) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code IN (SELECT a.block_code FROM blocks a RIGHT JOIN (SELECT region_code FROM user_regions WHERE user_id="+USER_ID+") b ON a.district_code = b.region_code) ORDER BY panchayat_code, date;" +
                "SELECT state_code FROM districts WHERE district_code IN (SELECT region_code FROM user_regions WHERE user_id='"+USER_ID+"') GROUP BY state_code;" +
                "SELECT * FROM contact;";
        }
    }
};

exports.outcomes = function() {
    return "SELECT outcome, label FROM outcomes;" +
        "SELECT date, mean, upper, outcome, lower, treatment FROM estimates_series;" +
        "SELECT * FROM estimates_summary;" +
        "SELECT date, mean, upper, outcome, lower, arm FROM estimates_series_arms;" + // arm === (1,2,3)
        "SELECT t1_mean, t2_mean, t3_mean, p_val, outcome FROM estimates_summary_arms;";
};
