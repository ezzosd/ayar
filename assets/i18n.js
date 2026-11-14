/* Ayar multilingual interface layer — Arabic source text remains unchanged. */
(function () {
  'use strict';
  var STORAGE_KEY = 'ayar:language';
  var translations = {
    en: {
      'عيار':'Ayar','الذهب والفضة والأخبار':'Gold, Silver & News','آخر تحديث:':'Last update:',
      'سعر المشغول':'Price with workmanship','↻ تحديث':'↻ Refresh','عن بيانات الأسعار':'About price data',
      'يعرض عيار أسعاراً استرشادية للذهب والفضة والبلاتين في عدد من الدول العربية، مع أدوات لحساب قيمة الجرام والسبائك والمصنعية والزكاة. تُحوّل الأسعار العالمية إلى العملات المحلية وفق أسعار الصرف المتاحة، وقد تختلف أسعار محلات الصاغة بسبب المصنعية والضرائب وفروق البيع والشراء. تحقق دائماً من وقت آخر تحديث قبل اتخاذ قرار مالي.':'Ayar provides indicative gold, silver and platinum prices across Arab markets, with tools to calculate gram, bar, workmanship and zakat values. Global prices are converted into local currencies using available exchange rates. Shop prices may differ due to workmanship, taxes and dealer spreads. Always check the latest update time before making a financial decision.',
      'سعر الذهب اليوم في مصر':'Gold price today in Egypt','أسعار الذهب في مصر':'Gold prices in Egypt',
      'أسئلة شائعة عن أسعار الذهب في مصر':'Frequently asked questions about gold prices in Egypt',
      'كيف أعرف سعر جرام الذهب عيار 21 في مصر؟':'How can I find the 21-karat gold price per gram in Egypt?',
      'راجع بطاقة عيار 21 في جدول أسعار الجرام أعلى الصفحة، وتأكد من وقت آخر تحديث والعملة المعروضة.':'Check the 21-karat card in the gram-price table above, and verify the update time and displayed currency.',
      'هل السعر المعروض هو سعر البيع النهائي في محلات الصاغة؟':'Is this the final selling price at jewellery shops?',
      'لا، السعر استرشادي للذهب وقد لا يشمل المصنعية أو الضرائب أو فروق البيع والشراء التي تختلف من تاجر إلى آخر.':'No. This is an indicative gold price and may exclude workmanship, taxes and dealer spreads, which vary from one seller to another.',
      'لماذا يتغير سعر الذهب بعملة مصر؟':'Why does the gold price in Egypt change?',
      'يتأثر السعر المحلي بحركة سعر الذهب عالمياً وبسعر صرف الجنيه المصري مقابل الدولار، إضافة إلى ظروف السوق المحلية.':'The local price is affected by global gold prices, the Egyptian pound exchange rate against the US dollar and local market conditions.',
      'استعرض أسعار الذهب في بقية الدول العربية':'Explore gold prices in other Arab countries','الصفحة الرئيسية لعيار':'Ayar homepage',
      'ملخص سعر الذهب الحالي':'Current gold price summary','أونصة الذهب عيار 24':'24K gold ounce',
      'دولار أمريكي للأونصة':'US dollars per ounce','الذهب — سعر الجرام':'Gold — price per gram','سعر الخام':'Spot price',
      'الفضة والعملة':'Silver & currency','الفضة':'Silver','أونصة الفضة':'Silver ounce','كيلو الفضة':'Silver kilogram',
      'سعر الصرف':'Exchange rate','لكل 1 دولار أمريكي':'per 1 US dollar','100 دولار':'100 US dollars','1 عملة محلية':'1 local currency unit',
      'قسم الفضة المتخصص':'Silver market','أسعار الفضة 999 و 925 و 800 — بالعملة المحلية':'999, 925 and 800 silver prices — in local currency',
      'حاسبة الفضة':'Silver calculator','الوزن (جرام)':'Weight (grams)','النقاء':'Purity','999 (فضة نقية)':'999 (Fine silver)',
      '925 (فضة إسترليني)':'925 (Sterling silver)','800 (فضة قياسية)':'800 (Standard silver)','نسبة المصنعية (٪)':'Workmanship (%)',
      'سعر الخام':'Spot price','+ المصنعية':'+ Workmanship','💵 السعر النهائي':'💵 Final price','الرسم البياني للفضة':'Silver price chart',
      '24 ساعة':'24 hours','7 أيام':'7 days','30 يوماً':'30 days','سنة':'1 year','جارٍ تحميل البيانات…':'Loading data…',
      'المصدر: Yahoo Finance / CoinGecko':'Sources: Yahoo Finance / CoinGecko','🪨 البلاتين':'🪨 Platinum',
      'سعر البلاتين 950 — بالعملة المحلية':'950 platinum price — in local currency','البلاتين (XPT) — نقاء 950':'Platinum (XPT) — 950 purity',
      'أونصة البلاتين':'Platinum ounce','كيلو البلاتين':'Platinum kilogram','الأونصة بالدولار':'Ounce in USD',
      'ملاحظة عن البلاتين':'About platinum','— لا توجد عيارات كما في الذهب.':'— Platinum does not have karat grades like gold.',
      'الأسعار استرشادية ومتقلبة عالميًا؛ قد تختلف عن سعر الصاغة المحلي بهامش مصنعية. يعرض الموقع سعر الجرام النقي 950.':'Prices are indicative and fluctuate globally. Local jeweller prices may differ due to workmanship. This site displays the price of 950-purity platinum per gram.',
      'السبائك والجنيهات الذهبية':'Gold bars and coins','سعر الشراء شامل مصنعية السبائك':'Purchase price including bar premium',
      'أخبار وتحليلات الذهب':'Gold news & analysis','تحديث تلقائي':'Auto update','تحديث الأخبار':'Refresh news','جارٍ تحميل الأخبار…':'Loading news…',
      '🔔 تنبيهات الأسعار':'🔔 Price alerts','أدخل بريدك والسعر — سننبهك عند تحقيقه':'Enter your email and target price — we will notify you when it is reached',
      'إنشاء تنبيه جديد':'Create alert','البريد الإلكتروني':'Email address','السعر المستهدف (للجرام)':'Target price (per gram)',
      'مثلاً 6000':'e.g. 6000','العيار':'Karat','الاتجاه':'Direction','عند الهبوط إلى السعر أو أقل':'When the price falls to this level or below',
      'عند الصعود إلى السعر أو أكثر':'When the price rises to this level or above','تنبيهني 🔔':'Notify me 🔔',
      'تفعيل إشعارات المتصفح':'Enable browser notifications','لا توجد تنبيهات نشطة بعد.':'There are no active alerts yet.',
      'الرسم البياني التاريخي للذهب':'Historical gold price chart','بالعملة المحلية':'In local currency','سعر أونصة الذهب':'Gold ounce price',
      'آخر 24 ساعة':'Last 24 hours','مقارنة الأسعار بين الدول':'Compare prices between countries','أين الذهب أرخص؟':'Where is gold cheaper?',
      'الدولة':'Country','سعر الجرام 21':'21K price per gram','+ ضرائب':'+ Taxes','السعر النهائي':'Final price',
      'حاسبات الذهب والمصنعية':'Gold & workmanship calculators','احسب سعر الشراء والبيع':'Calculate buying and selling prices',
      '+ الضريبة':'+ Tax','💵 الشراء من التاجر':'💵 Buy from dealer','💰 البيع للتاجر':'💰 Sell to dealer','⚠️ خسارة التداول':'⚠️ Trading loss',
      'حساب استرشادي؛ تختلف الضرائب والمصنعية وفروق البيع والشراء حسب البلد والتاجر.':'Indicative calculation. Taxes, workmanship and dealer spreads vary by country and seller.',
      '🧮 حاسبة المصنعية المتقدمة':'🧮 Advanced workmanship calculator','طريقة المصنعية':'Workmanship method',
      'نسبة مئوية (%)':'Percentage (%)','مبلغ ثابت للجرام (ج.م/جم)':'Fixed amount per gram','قيمة المصنعية':'Workmanship amount',
      'استخدام المتوسط الرسمي للعيار':'Use the default karat average','+ ضريبة على المصنعية فقط':'+ Tax on workmanship only',
      '💵 إجمالي الشراء':'💵 Total purchase','⚠️ صافي الخسارة':'⚠️ Net loss',
      'قيم المصنعية الافتراضية قابلة للتعديل وليست تسعيرة رسمية موحدة.':'Default workmanship values are editable and are not official fixed prices.',
      'حاسبة الزكاة':'Zakat calculator','الزكاة المستحقة (2.5%)':'Zakat due (2.5%)','النصاب: 85 جرام من الذهب الخالص.':'Nisab: 85 grams of pure gold.',
      'تنبيه مهم:':'Important notice:','عيار — جميع الحقوق محفوظة':'Ayar — All rights reserved','يرجى تفعيل JavaScript.':'Please enable JavaScript.',
      'مصر':'Egypt','السعودية':'Saudi Arabia','الإمارات':'United Arab Emirates','البحرين':'Bahrain','العراق':'Iraq','الكويت':'Kuwait','قطر':'Qatar','عُمان':'Oman','الأردن':'Jordan',
      'الجزائر':'Algeria','المغرب':'Morocco','سبيكة 1 جم':'1 g bar','سبيكة 5 جم':'5 g bar','سبيكة 10 جم':'10 g bar','سبيكة 20 جم':'20 g bar',
      'سبيكة 50 جم':'50 g bar','سبيكة 100 جم':'100 g bar','جنيه ذهب':'Gold coin','فضة نقية':'Fine silver','الأنقى':'Finest',
      'فضة إسترليني':'Sterling silver','الأشهر':'Most popular','فضة قياسية':'Standard silver','أخبار':'News','مصدر':'Source',
      'سيتم تحديث الأخبار تلقائيًا عند توفر الاتصال.':'News will refresh automatically when a connection is available.',
      '📰 لا توجد أخبار جديدة حالياً.':'📰 No new articles are available right now.','جارٍ التحديث…':'Updating…','حذف':'Delete',
      'الهبوط':'Falls to','الصعود':'Rises to','⚠️ أدخل سعراً مستهدفاً صحيحاً.':'⚠️ Enter a valid target price.',
      '⚠️ لديك 5 تنبيهات نشطة — احذف بعضها أولاً من القائمة أدناه.':'⚠️ You have 5 active alerts. Delete one before adding another.',
      'خطأ':'Error','للجرام':'per gram','الكيلو: —':'Kilogram: —','🏆 الأرخص':'🏆 Lowest','📈 الأغلى':'📈 Highest','💡 الفرق':'💡 Difference',
      'ضريبة':'Tax','بدون (سبائك)':'None (bars)','لم يبلغ النصاب':'Below nisab','النصاب مُستوفى (2.5% من قيمة الذهب الخالص).':'Nisab reached (2.5% of the value of pure gold).',
      'بيانات محدثة':'Data updated','⚠️ تحديث جزئي':'⚠️ Partial update','⚠️ بيانات قديمة':'⚠️ Stale data',
      '📦 بيانات محفوظة حديثاً':'📦 Recently cached data','⚠️ تعذّر تحميل البيانات التاريخية — حاول التحديث لاحقاً':'⚠️ Historical data unavailable — please try again later',

      "تعرض هذه الصفحة أسعار الذهب الاسترشادية في": "This page shows indicative gold prices in",
      "، مع متابعة سعر جرام الذهب لعيارات": ", with gold prices per gram for karats",
      "يمكنك مقارنة العيارات ومراجعة أسعار": "You can compare karats and review prices for",
      "وحساب قيمة الذهب والسبائك.": "and calculate the value of gold and bars.",
      "تُحسب الأسعار المحلية بالاعتماد على السعر العالمي ومعدل تحويل العملة المتاح. وقد يختلف السعر النهائي لدى التجار بسبب المصنعية والضرائب وفروق البيع والشراء؛ لذلك راجع وقت آخر تحديث قبل اتخاذ قرار الشراء أو البيع.": "Local prices are calculated using the global spot price and the available exchange rate. Dealer prices may differ because of workmanship, taxes and buy/sell spreads. Check the update time before buying or selling.",
      "أسئلة شائعة عن أسعار الذهب في": "Frequently asked questions about gold prices in",
      "كيف أعرف سعر جرام الذهب عيار 21 في": "How can I find the 21K gold price per gram in",
      "لماذا يتغير سعر الذهب بعملة": "Why does the gold price in",
      "يتأثر السعر المحلي بحركة سعر الذهب عالمياً وبسعر صرف": "The local price is affected by global gold prices and the exchange rate of",
      "مقابل الدولار، إضافة إلى ظروف السوق المحلية.": "against the US dollar and local market conditions.",
      "الأسعار المعروضة استرشادية ومحسوبة من أسعار المعادن العالمية وسعر الصرف، ولا تشمل بالضرورة المصنعية أو الضرائب أو هامش التاجر الفعلي. قد تتأخر البيانات أو تتوقف عند تعذّر المصدر؛ راجع حالة التحديث ووقته قبل اتخاذ قرار شراء أو بيع.": "Displayed prices are indicative and based on global metal prices and exchange rates. They may not include actual workmanship, taxes or dealer margins. Data may be delayed or unavailable; check the update status and time before buying or selling.",
      "سعر جرام الذهب": "Gold price per gram",
      "عيارات": "karats",
      "مبلغ ثابت للجرام": "Fixed amount per gram",
      "أو": "or",
      "دج/جم": "DZD/g",
      "د.م/جم": "MAD/g",
      "مباشر": "Live",
      "؟": "?",
      "تجريبي": "Demo",
      "تابع سعر الذهب اليوم في مصر بالجنيه المصري، وأسعار جرام الذهب عيار 24 و22 و21 و18، مع أسعار الفضة والبلاتين وحاسبات الذهب من عيار.": "Track today’s gold price in Egypt in Egyptian pounds, including 24K, 22K, 21K and 18K gram prices, silver and platinum prices, and Ayar gold calculators.",
      "أسعار الذهب والفضة والبلاتين والسبائك في 11 دولة عربية، مع أخبار وتحليلات تلقائية وتنبيهات فورية.": "Gold, silver, platinum and bullion prices across 9 Arab countries, with automatic news, analysis and instant alerts.",
      "أسعار الذهب في الدول العربية": "Gold prices across Arab countries",
      "كل الدول والأسواق ←": "All countries and markets ←",
      "اختر الدولة لمتابعة أسعار الذهب بالعملة المحلية، مع أسعار عيارات 24 و22 و21 و18. الأسعار استرشادية وقد تختلف عن أسعار البيع والشراء لدى محلات الصاغة.": "Choose a country to follow gold prices in local currency, including 24K, 22K, 21K and 18K. Prices are indicative and may differ from jewellers’ buying and selling prices.",
      "تابع سعر الجرام والعيارات بالعملة المحلية": "Follow gram and karat prices in local currency",
      "البلاتين يُستخدم في المجوهرات بنقاء": "Platinum is used in jewellery at a purity of",
      "بيانات تاريخية استرشادية من مصادر خارجية (قد تستخدم عقوداً آجلة أو أصولاً مرتبطة بالذهب، وقد تختلف عن السعر الفوري المعروض). المصادر: Worker / Yahoo / CoinGecko / Stooq.": "Indicative historical data from external sources. It may use futures contracts or gold-linked assets and may differ from the displayed spot price. Sources: Worker / Yahoo / CoinGecko / Stooq.",
      "مقارنة تقديرية موحّدة بالدولار اعتماداً على نسب الضريبة والمصنعية الافتراضية داخل الموقع؛ ليست عرض سعر من متجر ولا تمثل بالضرورة الرسوم الفعلية في كل دولة.": "An estimated USD comparison based on the site's default tax and workmanship rates. It is not a shop quotation and may not reflect actual fees in each country.",
      "مصادر الأسعار والتاريخ والأخبار قد تتغير حسب توافر الخدمات الخارجية، ولا يضمن الموقع استمرار أي مصدر دون انقطاع.": "Price, historical-data and news sources may change depending on external service availability. Continuous availability of any source is not guaranteed.",
      "مكتبة EmailJS غير محملة": "EmailJS library is not loaded",
      "emailjs.send لم يرجع Promise": "emailjs.send did not return a Promise",
      "🔔 عيار — تحقق تنبيه السعر": "🔔 Ayar — Price alert check",
      "⚠️ تم حفظ التنبيه محلياً، لكن تعذّر إرسال البريد:": "⚠️ The alert was saved locally, but the email could not be sent:",
      "جارٍ التحديث…": "Updating…",
      "سعر الذهب اليوم في": "Gold price today in",
      "أسعار الذهب في": "Gold prices in",
      "بالعملة المحلية": "in local currency",
      "سعر جرام": "Price per gram",
      "المصنعية": "Workmanship",
      "جرام خالص. وزنك": "grams of pure gold. Your weight:",
      "جرام.": "grams.",
      "للجرام · نقاء 99.9%": "per gram · 99.9% purity",
      "للجرام · نقاء 950": "per gram · 950 purity",
      "البيع للتاجر": "Sell to dealer",
      "الشراء من التاجر": "Buy from dealer",
      "الذهب": "Gold",
      "الفضة": "Silver",
      "البلاتين": "Platinum",
      "العملة": "Currency",
      "أخبار": "News",
      "مصدر": "Source",
      "تنبيه": "Alert",
      "السعر": "Price",
      "الوزن": "Weight",
      "جرام": "gram",
      "جرامات": "grams",
      "كيلوجرام": "kilogram",
      "أونصة": "ounce",
      "عيار": "Karat",
      "الذهب عيار": "Gold",
      "الفضة عيار": "Silver",
      "مصر": "Egypt",
      "السعودية": "Saudi Arabia",
      "الإمارات": "United Arab Emirates",
      "البحرين": "Bahrain",
      "العراق": "Iraq",
      "الكويت": "Kuwait",
      "قطر": "Qatar",
      "عُمان": "Oman",
      "الأردن": "Jordan",
      "الجزائر": "Algeria",
      "المغرب": "Morocco",
      "الدينار الجزائري": "Algerian dinar",
      "الدرهم المغربي": "Moroccan dirham",
      "بالدينار الجزائري": "in Algerian dinars",
      "بالدرهم المغربي": "in Moroccan dirhams",
      "ج.م": "EGP",
      "ر.س": "SAR",
      "د.إ": "AED",
      "د.ب": "BHD",
      "د.ع": "IQD",
      "د.ك": "KWD",
      "ر.ق": "QAR",
      "ر.ع": "OMR",
      "د.أ": "JOD",
    },
    fr: {
      'عيار':'Ayar','الذهب والفضة والأخبار':'Or, argent et actualités','آخر تحديث:':'Dernière mise à jour :',
      'سعر المشغول':'Prix avec fabrication','↻ تحديث':'↻ Actualiser','عن بيانات الأسعار':'À propos des prix',
      'يعرض عيار أسعاراً استرشادية للذهب والفضة والبلاتين في عدد من الدول العربية، مع أدوات لحساب قيمة الجرام والسبائك والمصنعية والزكاة. تُحوّل الأسعار العالمية إلى العملات المحلية وفق أسعار الصرف المتاحة، وقد تختلف أسعار محلات الصاغة بسبب المصنعية والضرائب وفروق البيع والشراء. تحقق دائماً من وقت آخر تحديث قبل اتخاذ قرار مالي.':'Ayar présente des prix indicatifs de l’or, de l’argent et du platine sur plusieurs marchés arabes, ainsi que des outils de calcul pour les grammes, lingots, frais de fabrication et zakat. Les prix mondiaux sont convertis en monnaies locales selon les taux disponibles. Les prix des bijoutiers peuvent différer en raison des frais, taxes et marges. Vérifiez toujours l’heure de mise à jour avant toute décision financière.',
      'سعر الذهب اليوم في مصر':'Prix de l’or aujourd’hui en Égypte','أسعار الذهب في مصر':'Prix de l’or en Égypte',
      'أسئلة شائعة عن أسعار الذهب في مصر':'Questions fréquentes sur le prix de l’or en Égypte',
      'كيف أعرف سعر جرام الذهب عيار 21 في مصر؟':'Comment connaître le prix du gramme d’or 21 carats en Égypte ?',
      'راجع بطاقة عيار 21 في جدول أسعار الجرام أعلى الصفحة، وتأكد من وقت آخر تحديث والعملة المعروضة.':'Consultez la carte 21 carats dans le tableau des prix au-dessus et vérifiez l’heure de mise à jour ainsi que la devise affichée.',
      'هل السعر المعروض هو سعر البيع النهائي في محلات الصاغة؟':'Le prix affiché est-il le prix final chez les bijoutiers ?',
      'لا، السعر استرشادي للذهب وقد لا يشمل المصنعية أو الضرائب أو فروق البيع والشراء التي تختلف من تاجر إلى آخر.':'Non. Il s’agit d’un prix indicatif qui peut exclure les frais de fabrication, les taxes et les marges, variables selon les vendeurs.',
      'لماذا يتغير سعر الذهب بعملة مصر؟':'Pourquoi le prix de l’or en Égypte change-t-il ?',
      'يتأثر السعر المحلي بحركة سعر الذهب عالمياً وبسعر صرف الجنيه المصري مقابل الدولار، إضافة إلى ظروف السوق المحلية.':'Le prix local dépend du cours mondial de l’or, du taux de change de la livre égyptienne face au dollar et des conditions du marché local.',
      'استعرض أسعار الذهب في بقية الدول العربية':'Voir les prix de l’or dans les autres pays arabes','الصفحة الرئيسية لعيار':'Accueil Ayar',
      'ملخص سعر الذهب الحالي':'Résumé du prix actuel de l’or','أونصة الذهب عيار 24':'Once d’or 24 carats',
      'دولار أمريكي للأونصة':'dollars US par once','الذهب — سعر الجرام':'Or — prix du gramme','سعر الخام':'Prix au comptant',
      'الفضة والعملة':'Argent et devise','الفضة':'Argent','أونصة الفضة':'Once d’argent','كيلو الفضة':'Kilo d’argent',
      'سعر الصرف':'Taux de change','لكل 1 دولار أمريكي':'pour 1 dollar américain','100 دولار':'100 dollars','1 عملة محلية':'1 unité monétaire locale',
      'قسم الفضة المتخصص':'Marché de l’argent','أسعار الفضة 999 و 925 و 800 — بالعملة المحلية':'Prix de l’argent 999, 925 et 800 — en monnaie locale',
      'حاسبة الفضة':'Calculateur d’argent','الوزن (جرام)':'Poids (grammes)','النقاء':'Pureté','999 (فضة نقية)':'999 (argent fin)',
      '925 (فضة إسترليني)':'925 (argent sterling)','800 (فضة قياسية)':'800 (argent standard)','نسبة المصنعية (٪)':'Frais de fabrication (%)',
      '+ المصنعية':'+ Fabrication','💵 السعر النهائي':'💵 Prix final','الرسم البياني للفضة':'Graphique du prix de l’argent',
      '24 ساعة':'24 heures','7 أيام':'7 jours','30 يوماً':'30 jours','سنة':'1 an','جارٍ تحميل البيانات…':'Chargement des données…',
      'المصدر: Yahoo Finance / CoinGecko':'Sources : Yahoo Finance / CoinGecko','🪨 البلاتين':'🪨 Platine',
      'سعر البلاتين 950 — بالعملة المحلية':'Prix du platine 950 — en monnaie locale','البلاتين (XPT) — نقاء 950':'Platine (XPT) — pureté 950',
      'أونصة البلاتين':'Once de platine','كيلو البلاتين':'Kilo de platine','الأونصة بالدولار':'Once en USD',
      'ملاحظة عن البلاتين':'À propos du platine','— لا توجد عيارات كما في الذهب.':'— Le platine n’a pas de carats comme l’or.',
      'الأسعار استرشادية ومتقلبة عالميًا؛ قد تختلف عن سعر الصاغة المحلي بهامش مصنعية. يعرض الموقع سعر الجرام النقي 950.':'Les prix sont indicatifs et fluctuent sur les marchés mondiaux. Les prix locaux peuvent varier selon les frais de fabrication. Le site affiche le prix du gramme de platine 950.',
      'السبائك والجنيهات الذهبية':'Lingots et pièces d’or','سعر الشراء شامل مصنعية السبائك':'Prix d’achat avec prime du lingot',
      'أخبار وتحليلات الذهب':'Actualités et analyses de l’or','تحديث تلقائي':'Mise à jour automatique','تحديث الأخبار':'Actualiser les actualités','جارٍ تحميل الأخبار…':'Chargement des actualités…',
      '🔔 تنبيهات الأسعار':'🔔 Alertes de prix','أدخل بريدك والسعر — سننبهك عند تحقيقه':'Saisissez votre e-mail et le prix cible — nous vous avertirons lorsqu’il sera atteint',
      'إنشاء تنبيه جديد':'Créer une alerte','البريد الإلكتروني':'Adresse e-mail','السعر المستهدف (للجرام)':'Prix cible (par gramme)',
      'مثلاً 6000':'ex. 6000','العيار':'Carat','الاتجاه':'Direction','عند الهبوط إلى السعر أو أقل':'Lorsque le prix atteint ce niveau ou descend plus bas',
      'عند الصعود إلى السعر أو أكثر':'Lorsque le prix atteint ce niveau ou monte plus haut','تنبيهني 🔔':'M’avertir 🔔',
      'تفعيل إشعارات المتصفح':'Activer les notifications du navigateur','لا توجد تنبيهات نشطة بعد.':'Aucune alerte active pour le moment.',
      'الرسم البياني التاريخي للذهب':'Graphique historique du prix de l’or','بالعملة المحلية':'En monnaie locale','سعر أونصة الذهب':'Prix de l’once d’or',
      'آخر 24 ساعة':'Dernières 24 heures','مقارنة الأسعار بين الدول':'Comparer les prix entre pays','أين الذهب أرخص؟':'Où l’or est-il le moins cher ?',
      'الدولة':'Pays','سعر الجرام 21':'Prix du gramme 21 carats','+ ضرائب':'+ Taxes','السعر النهائي':'Prix final',
      'حاسبات الذهب والمصنعية':'Calculateurs d’or et de fabrication','احسب سعر الشراء والبيع':'Calculer les prix d’achat et de vente',
      '+ الضريبة':'+ Taxe','💵 الشراء من التاجر':'💵 Achat au commerçant','💰 البيع للتاجر':'💰 Vente au commerçant','⚠️ خسارة التداول':'⚠️ Perte à la revente',
      'حساب استرشادي؛ تختلف الضرائب والمصنعية وفروق البيع والشراء حسب البلد والتاجر.':'Calcul indicatif. Les taxes, frais de fabrication et marges varient selon le pays et le vendeur.',
      '🧮 حاسبة المصنعية المتقدمة':'🧮 Calculateur avancé des frais','طريقة المصنعية':'Méthode de fabrication',
      'نسبة مئوية (%)':'Pourcentage (%)','مبلغ ثابت للجرام (ج.م/جم)':'Montant fixe par gramme','قيمة المصنعية':'Montant des frais',
      'استخدام المتوسط الرسمي للعيار':'Utiliser la moyenne par défaut du carat','+ ضريبة على المصنعية فقط':'+ Taxe sur les frais uniquement',
      '💵 إجمالي الشراء':'💵 Total de l’achat','⚠️ صافي الخسارة':'⚠️ Perte nette',
      'قيم المصنعية الافتراضية قابلة للتعديل وليست تسعيرة رسمية موحدة.':'Les frais par défaut sont modifiables et ne constituent pas un tarif officiel uniforme.',
      'حاسبة الزكاة':'Calculateur de zakat','الزكاة المستحقة (2.5%)':'Zakat due (2,5 %)','النصاب: 85 جرام من الذهب الخالص.':'Nisab : 85 grammes d’or pur.',
      'تنبيه مهم:':'Avis important :','عيار — جميع الحقوق محفوظة':'Ayar — Tous droits réservés','يرجى تفعيل JavaScript.':'Veuillez activer JavaScript.',
      'مصر':'Égypte','السعودية':'Arabie saoudite','الإمارات':'Émirats arabes unis','البحرين':'Bahreïn','العراق':'Irak','الكويت':'Koweït','قطر':'Qatar','عُمان':'Oman','الأردن':'Jordanie',
      'الجزائر':'Algérie','المغرب':'Maroc','سبيكة 1 جم':'Lingot 1 g','سبيكة 5 جم':'Lingot 5 g','سبيكة 10 جم':'Lingot 10 g','سبيكة 20 جم':'Lingot 20 g',
      'سبيكة 50 جم':'Lingot 50 g','سبيكة 100 جم':'Lingot 100 g','جنيه ذهب':'Pièce d’or','فضة نقية':'Argent fin','الأنقى':'Le plus pur',
      'فضة إسترليني':'Argent sterling','الأشهر':'Le plus populaire','فضة قياسية':'Argent standard','أخبار':'Actualités','مصدر':'Source',
      'سيتم تحديث الأخبار تلقائيًا عند توفر الاتصال.':'Les actualités seront actualisées automatiquement dès que la connexion sera disponible.',
      '📰 لا توجد أخبار جديدة حالياً.':'📰 Aucune nouvelle actualité pour le moment.','جارٍ التحديث…':'Mise à jour…','حذف':'Supprimer',
      'الهبوط':'Baisse à','الصعود':'Hausse à','⚠️ أدخل سعراً مستهدفاً صحيحاً.':'⚠️ Saisissez un prix cible valide.',
      '⚠️ لديك 5 تنبيهات نشطة — احذف بعضها أولاً من القائمة أدناه.':'⚠️ Vous avez 5 alertes actives. Supprimez-en une avant d’en ajouter une autre.',
      'خطأ':'Erreur','للجرام':'par gramme','الكيلو: —':'Kilo : —','🏆 الأرخص':'🏆 Le moins cher','📈 الأغلى':'📈 Le plus cher','💡 الفرق':'💡 Écart',
      'ضريبة':'Taxe','بدون (سبائك)':'Aucun (lingots)','لم يبلغ النصاب':'Sous le nisab','النصاب مُستوفى (2.5% من قيمة الذهب الخالص).':'Nisab atteint (2,5 % de la valeur de l’or pur).',
      'بيانات محدثة':'Données actualisées','⚠️ تحديث جزئي':'⚠️ Mise à jour partielle','⚠️ بيانات قديمة':'⚠️ Données anciennes',
      '📦 بيانات محفوظة حديثاً':'📦 Données récemment mises en cache','⚠️ تعذّر تحميل البيانات التاريخية — حاول التحديث لاحقاً':'⚠️ Historique indisponible — veuillez réessayer plus tard',
      "تعرض هذه الصفحة أسعار الذهب الاسترشادية في": "Cette page présente les cours indicatifs de l’or — ",
      "، مع متابعة سعر جرام الذهب لعيارات": ", avec les prix du gramme pour les carats",
      "يمكنك مقارنة العيارات ومراجعة أسعار": "Vous pouvez comparer les carats et consulter les prix de",
      "وحساب قيمة الذهب والسبائك.": "et calculer la valeur de l’or et des lingots.",
      "تُحسب الأسعار المحلية بالاعتماد على السعر العالمي ومعدل تحويل العملة المتاح. وقد يختلف السعر النهائي لدى التجار بسبب المصنعية والضرائب وفروق البيع والشراء؛ لذلك راجع وقت آخر تحديث قبل اتخاذ قرار الشراء أو البيع.": "Les prix locaux sont calculés à partir du cours mondial et du taux de change disponible. Les prix des commerçants peuvent varier selon les frais de fabrication, taxes et marges achat-vente. Vérifiez l’heure de mise à jour avant tout achat ou vente.",
      "أسئلة شائعة عن أسعار الذهب في": "Questions fréquentes sur le cours de l’or — ",
      "كيف أعرف سعر جرام الذهب عيار 21 في": "Comment connaître le prix du gramme d’or 21 carats — ",
      "لماذا يتغير سعر الذهب بعملة": "Pourquoi le cours de l’or varie-t-il selon la devise — ",
      "يتأثر السعر المحلي بحركة سعر الذهب عالمياً وبسعر صرف": "Le prix local dépend du cours mondial de l’or et du taux de change du",
      "مقابل الدولار، إضافة إلى ظروف السوق المحلية.": "face au dollar, ainsi que des conditions du marché local.",
      "الأسعار المعروضة استرشادية ومحسوبة من أسعار المعادن العالمية وسعر الصرف، ولا تشمل بالضرورة المصنعية أو الضرائب أو هامش التاجر الفعلي. قد تتأخر البيانات أو تتوقف عند تعذّر المصدر؛ راجع حالة التحديث ووقته قبل اتخاذ قرار شراء أو بيع.": "Les prix affichés sont indicatifs et calculés à partir des cours mondiaux et des taux de change. Ils peuvent exclure les frais de fabrication, taxes et marges réelles. Les données peuvent être retardées ou indisponibles ; vérifiez l’état et l’heure de mise à jour avant d’acheter ou de vendre.",
      "سعر جرام الذهب": "Prix de l’or au gramme",
      "عيارات": "carats",
      "مبلغ ثابت للجرام": "Montant fixe par gramme",
      "أو": "ou",
      "دج/جم": "DZD/g",
      "د.م/جم": "MAD/g",
      "مباشر": "En direct",
      "؟": "?",
      "تجريبي": "Démo",
      "تابع سعر الذهب اليوم في مصر بالجنيه المصري، وأسعار جرام الذهب عيار 24 و22 و21 و18، مع أسعار الفضة والبلاتين وحاسبات الذهب من عيار.": "Suivez le cours de l’or aujourd’hui en Égypte en livres égyptiennes : prix du gramme 24, 22, 21 et 18 carats, argent, platine et calculateurs Ayar.",
      "أسعار الذهب والفضة والبلاتين والسبائك في 11 دولة عربية، مع أخبار وتحليلات تلقائية وتنبيهات فورية.": "Cours de l’or, de l’argent, du platine et des lingots dans 9 pays arabes, avec actualités, analyses et alertes instantanées.",
      "أسعار الذهب في الدول العربية": "Prix de l’or dans les pays arabes",
      "كل الدول والأسواق ←": "Tous les pays et marchés ←",
      "اختر الدولة لمتابعة أسعار الذهب بالعملة المحلية، مع أسعار عيارات 24 و22 و21 و18. الأسعار استرشادية وقد تختلف عن أسعار البيع والشراء لدى محلات الصاغة.": "Choisissez un pays pour suivre les cours de l’or en monnaie locale, notamment les prix 24, 22, 21 et 18 carats. Les prix sont indicatifs et peuvent différer de ceux des bijoutiers.",
      "تابع سعر الجرام والعيارات بالعملة المحلية": "Suivez le prix du gramme et des carats en monnaie locale",
      "البلاتين يُستخدم في المجوهرات بنقاء": "Le platine est utilisé en joaillerie avec une pureté de",
      "بيانات تاريخية استرشادية من مصادر خارجية (قد تستخدم عقوداً آجلة أو أصولاً مرتبطة بالذهب، وقد تختلف عن السعر الفوري المعروض). المصادر: Worker / Yahoo / CoinGecko / Stooq.": "Données historiques indicatives provenant de sources externes. Elles peuvent utiliser des contrats à terme ou des actifs liés à l’or et différer du cours au comptant affiché. Sources : Worker / Yahoo / CoinGecko / Stooq.",
      "مقارنة تقديرية موحّدة بالدولار اعتماداً على نسب الضريبة والمصنعية الافتراضية داخل الموقع؛ ليست عرض سعر من متجر ولا تمثل بالضرورة الرسوم الفعلية في كل دولة.": "Comparaison estimative en dollars fondée sur les taux de taxe et de fabrication par défaut du site. Il ne s’agit pas d’un devis de magasin et ces montants ne reflètent pas nécessairement les frais réels de chaque pays.",
      "مصادر الأسعار والتاريخ والأخبار قد تتغير حسب توافر الخدمات الخارجية، ولا يضمن الموقع استمرار أي مصدر دون انقطاع.": "Les sources des prix, données historiques et actualités peuvent changer selon la disponibilité des services externes. Leur disponibilité continue n’est pas garantie.",
      "مكتبة EmailJS غير محملة": "La bibliothèque EmailJS n’est pas chargée",
      "emailjs.send لم يرجع Promise": "emailjs.send n’a pas renvoyé de Promise",
      "🔔 عيار — تحقق تنبيه السعر": "🔔 Ayar — Vérification de l’alerte de prix",
      "⚠️ تم حفظ التنبيه محلياً، لكن تعذّر إرسال البريد:": "⚠️ L’alerte a été enregistrée localement, mais l’e-mail n’a pas pu être envoyé :",
      "جارٍ التحديث…": "Mise à jour…",
      "سعر الذهب اليوم في": "Cours de l’or aujourd’hui — ",
      "أسعار الذهب في": "Prix de l’or en",
      "بالعملة المحلية": "en monnaie locale",
      "سعر جرام": "Prix du gramme",
      "المصنعية": "Frais de fabrication",
      "جرام خالص. وزنك": "grammes d’or pur. Votre poids :",
      "جرام.": "grammes.",
      "للجرام · نقاء 99.9%": "par gramme · pureté 99,9 %",
      "للجرام · نقاء 950": "par gramme · pureté 950",
      "البيع للتاجر": "Vente au commerçant",
      "الشراء من التاجر": "Achat au commerçant",
      "الذهب": "Or",
      "الفضة": "Argent",
      "البلاتين": "Platine",
      "العملة": "Devise",
      "أخبار": "Actualités",
      "مصدر": "Source",
      "تنبيه": "Alerte",
      "السعر": "Prix",
      "الوزن": "Poids",
      "جرام": "gramme",
      "جرامات": "grammes",
      "كيلوجرام": "kilogramme",
      "أونصة": "once",
      "عيار": "Carat",
      "الذهب عيار": "Or",
      "الفضة عيار": "Argent",
      "مصر": "Égypte",
      "السعودية": "Arabie saoudite",
      "الإمارات": "Émirats arabes unis",
      "البحرين": "Bahreïn",
      "العراق": "Irak",
      "الكويت": "Koweït",
      "قطر": "Qatar",
      "عُمان": "Oman",
      "الأردن": "Jordanie",
      "الجزائر": "Algérie",
      "المغرب": "Maroc",
      "الدينار الجزائري": "dinar algérien",
      "الدرهم المغربي": "dirham marocain",
      "بالدينار الجزائري": "en dinars algériens",
      "بالدرهم المغربي": "en dirhams marocains",
      "ج.م": "EGP",
      "ر.س": "SAR",
      "د.إ": "AED",
      "د.ب": "BHD",
      "د.ع": "IQD",
      "د.ك": "KWD",
      "ر.ق": "QAR",
      "ر.ع": "OMR",
      "د.أ": "JOD",
    }
  };
  var textOriginals = new WeakMap();
  var textTranslated = new WeakMap();
  var attrOriginals = new WeakMap();
  var attrTranslated = new WeakMap();
  var busy = false;
  var current = 'ar';
  var originalTitle = document.title;
  var originalMeta = new WeakMap();
  function translateText(source, lang) {
    if (lang === 'ar') return source;
    var dict = translations[lang] || {};
    if (Object.prototype.hasOwnProperty.call(dict, source.trim())) {
      var leading = source.match(/^\s*/)[0], trailing = source.match(/\s*$/)[0];
      return leading + dict[source.trim()] + trailing;
    }
    var out = source;
    Object.keys(dict).sort(function(a,b){return b.length-a.length;}).forEach(function(key){
      if (out.indexOf(key) !== -1) out = out.split(key).join(dict[key]);
    });
    return out;
  }
  function processText(node) {
    var previousTranslation = textTranslated.get(node);
    if (!textOriginals.has(node) || (typeof previousTranslation !== 'undefined' && node.nodeValue !== previousTranslation)) {
      textOriginals.set(node, node.nodeValue);
    }
    var original = textOriginals.get(node);
    var next = translateText(original, current);
    textTranslated.set(node, next);
    if (node.nodeValue !== next) node.nodeValue = next;
  }
  function processAttributes(el) {
    ['placeholder','title','aria-label','alt'].forEach(function(name){
      if (!el.hasAttribute(name)) return;
      var map = attrOriginals.get(el);
      var translatedMap = attrTranslated.get(el);
      if (!map) { map = {}; attrOriginals.set(el,map); }
      if (!translatedMap) { translatedMap = {}; attrTranslated.set(el,translatedMap); }
      var liveValue = el.getAttribute(name);
      if (typeof map[name] === 'undefined' || (typeof translatedMap[name] !== 'undefined' && liveValue !== translatedMap[name])) map[name] = liveValue;
      var next = translateText(map[name], current);
      translatedMap[name] = next;
      if (liveValue !== next) el.setAttribute(name,next);
    });
  }
  function scan(root) {
    if (!root) return;
    if (root.nodeType === 3) { processText(root); return; }
    if (root.nodeType === 1) processAttributes(root);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.parentElement && /^(SCRIPT|STYLE|NOSCRIPT)$/i.test(node.parentElement.tagName) && !node.parentElement.closest('#ayar-language-select')) continue;
      processText(node);
    }
    if (root.querySelectorAll) root.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(processAttributes);
  }
  function languageFromPath() {
    var match = location.pathname.match(/^\/(en|fr)(?:\/|$)/);
    return match ? match[1] : 'ar';
  }
  function basePathFromUrl(pathname) {
    var base = pathname.replace(/^\/(?:en|fr)(?=\/|$)/, '');
    return base || '/';
  }
  function languageUrl(lang) {
    var base = basePathFromUrl(location.pathname);
    if (lang === 'ar') return base;
    return '/' + lang + (base.charAt(0) === '/' ? base : '/' + base);
  }
  function navigateLanguage(lang) {
    var target = languageUrl(lang);
    if (target !== location.pathname) location.assign(target);
  }
  function rewriteInternalLinks(root) {
    var prefix = languageFromPath();
    if (prefix === 'ar' || !root || !root.querySelectorAll) return;
    var links = [];
    if (root.matches && root.matches('a[href^="/"],a[href^="https://ayargo.com/"]')) links.push(root);
    root.querySelectorAll('a[href^="/"],a[href^="https://ayargo.com/"]').forEach(function(a){ links.push(a); });
    links.forEach(function(a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('//') === 0) return;
      var absolute = href.indexOf('https://ayargo.com/') === 0;
      var localPath = absolute ? href.slice('https://ayargo.com'.length) : href;
      if (/^\/(?:assets|api|\.well-known)(?:\/|$)/.test(localPath)) return;
      var base = localPath.replace(/^\/(?:en|fr)(?=\/|$)/, '');
      if (!base) base = '/';
      var next = '/' + prefix + (base.charAt(0) === '/' ? base : '/' + base);
      if (absolute) next = 'https://ayargo.com' + next;
      if (href !== next) a.setAttribute('href', next);
    });
  }
  function applyLanguage(lang) {
    current = translations[lang] ? lang : 'ar';
    document.documentElement.lang = current;
    document.documentElement.dir = current === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('ayar-ltr', current !== 'ar');
    scan(document.body);
    rewriteInternalLinks(document.body);
    if (originalTitle) document.title = translateText(originalTitle, current);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) { if (!originalMeta.has(desc)) originalMeta.set(desc, desc.content); desc.content = translateText(originalMeta.get(desc), current); }
    var og = document.querySelector('meta[property="og:description"]');
    if (og) { if (!originalMeta.has(og)) originalMeta.set(og, og.content); og.content = translateText(originalMeta.get(og), current); }
    var locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.content = current === 'fr' ? 'fr_FR' : current === 'en' ? 'en_US' : 'ar_AR';
    var selector = document.getElementById('ayar-language-select');
    if (selector) selector.value = current;
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
  }
  function addSelector() {
    if (document.getElementById('ayar-language-select')) return;
    var style = document.createElement('style');
    style.textContent = '.ayar-language-wrap{display:inline-flex;align-items:center;gap:6px;margin-inline-start:8px}.ayar-language-select{font-family:inherit;font-size:12px;font-weight:600;line-height:1.4;color:var(--text,#eef1f8);background:var(--surface,#111420);border:1px solid var(--line,#242a3d);border-radius:9px;padding:7px 9px;cursor:pointer;min-height:34px}body.ayar-ltr{direction:ltr}.ayar-ltr .header-inner,.ayar-ltr .header-meta,.ayar-ltr .toolbar{direction:ltr}.ayar-ltr input,.ayar-ltr select,.ayar-ltr textarea{direction:ltr;text-align:left}html[lang="en"] body,html[lang="fr"] body{font-family:Inter,Arial,sans-serif}';
    document.head.appendChild(style);
    var wrap = document.createElement('span');
    wrap.className = 'ayar-language-wrap';
    var select = document.createElement('select');
    select.id = 'ayar-language-select';
    select.className = 'ayar-language-select';
    select.setAttribute('aria-label','Language');
    [['ar','العربية'],['en','English'],['fr','Français']].forEach(function(item){
      var option = document.createElement('option'); option.value=item[0]; option.textContent=item[1]; select.appendChild(option);
    });
    select.addEventListener('change',function(){navigateLanguage(select.value);});
    wrap.appendChild(select);
    var target = document.querySelector('.header-meta') || document.querySelector('.header-inner') || document.querySelector('main') || document.body;
    var brand = document.querySelector('.brand');
    if (brand && target === document.querySelector('main') && brand.parentNode) brand.parentNode.insertBefore(wrap, brand.nextSibling);
    else target.appendChild(wrap);
  }
  function init() {
    addSelector();
    applyLanguage(languageFromPath());
    var observer = new MutationObserver(function(records){
      if (busy) return;
      busy = true;
      try {
        records.forEach(function(record){
          if (record.type === 'characterData') {
            processText(record.target);
          } else if (record.type === 'childList') {
            record.addedNodes.forEach(function(node){ scan(node); rewriteInternalLinks(node); });
          } else if (record.type === 'attributes') {
            processAttributes(record.target);
          }
        });
      } finally {
        busy = false;
      }
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','alt']});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();