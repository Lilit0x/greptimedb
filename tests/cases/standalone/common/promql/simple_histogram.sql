-- from prometheus/promql/testdata/histograms.test
-- cases related to metric `testhistogram_bucket`

create table histogram_bucket (
    ts timestamp time index,
    le string,
    s string,
    val double,
    primary key (s, le),
);

insert into histogram_bucket values
    (3000000, "0.1", "positive", 50),
    (3000000, ".2", "positive", 70),
    (3000000, "1e0", "positive", 110),
    (3000000, "+Inf", "positive", 120),
    (3000000, "-.2", "negative", 10),
    (3000000, "-0.1", "negative", 20),
    (3000000, "0.3", "negative", 20),
    (3000000, "+Inf", "negative", 30);

-- Quantile too low.
-- SQLNESS SORT_RESULT 3 1
tql eval (3000, 3000, '1s') histogram_quantile(-0.1, histogram_bucket);

-- Quantile too high.
-- SQLNESS SORT_RESULT 3 1
tql eval (3000, 3000, '1s') histogram_quantile(1.01, histogram_bucket);

-- Quantile invalid.
-- SQLNESS SORT_RESULT 3 1
tql eval (3000, 3000, '1s') histogram_quantile(NaN, histogram_bucket);

-- Quantile value in lowest bucket, which is positive.
tql eval (3000, 3000, '1s') histogram_quantile(0, histogram_bucket{s="positive"});

-- Quantile value in lowest bucket, which is negative.
tql eval (3000, 3000, '1s') histogram_quantile(0, histogram_bucket{s="negative"});

-- Quantile value in highest bucket.
-- SQLNESS SORT_RESULT 3 1
tql eval (3000, 3000, '1s') histogram_quantile(1, histogram_bucket);

-- Finally some useful quantiles.
-- SQLNESS SORT_RESULT 3 1
tql eval (3000, 3000, '1s') histogram_quantile(0.2, histogram_bucket);

-- SQLNESS SORT_RESULT 3 1
tql eval (3000, 3000, '1s') histogram_quantile(0.5, histogram_bucket);

-- SQLNESS SORT_RESULT 3 1
tql eval (3000, 3000, '1s') histogram_quantile(0.8, histogram_bucket);

-- More realistic with rates.
-- This case doesn't contains value because other point are not inserted.
-- quantile with rate is covered in other cases
tql eval (3000, 3000, '1s') histogram_quantile(0.2, rate(histogram_bucket[5m]));

drop table histogram_bucket;

-- cases related to `testhistogram2_bucket`
create table histogram2_bucket (
    ts timestamp time index,
    le string,
    val double,
    primary key (le),
);

insert into histogram2_bucket values
    (0, "0", 0),
    (300000, "0", 0),
    (600000, "0", 0),
    (900000, "0", 0),
    (1200000, "0", 0),
    (1500000, "0", 0),
    (1800000, "0", 0),
    (2100000, "0", 0),
    (2400000, "0", 0),
    (2700000, "0", 0),
    (0, "2", 1),
    (300000, "2", 2),
    (600000, "2", 3),
    (900000, "2", 4),
    (1200000, "2", 5),
    (1500000, "2", 6),
    (1800000, "2", 7),
    (2100000, "2", 8),
    (2400000, "2", 9),
    (2700000, "2", 10),
    (0, "4", 2),
    (300000, "4", 4),
    (600000, "4", 6),
    (900000, "4", 8),
    (1200000, "4", 10),
    (1500000, "4", 12),
    (1800000, "4", 14),
    (2100000, "4", 16),
    (2400000, "4", 18),
    (2700000, "4", 20),
    (0, "6", 3),
    (300000, "6", 6),
    (600000, "6", 9),
    (900000, "6", 12),
    (1200000, "6", 15),
    (1500000, "6", 18),
    (1800000, "6", 21),
    (2100000, "6", 24),
    (2400000, "6", 27),
    (2700000, "6", 30),
    (0, "+Inf", 3),
    (300000, "+Inf", 6),
    (600000, "+Inf", 9),
    (900000, "+Inf", 12),
    (1200000, "+Inf", 15),
    (1500000, "+Inf", 18),
    (1800000, "+Inf", 21),
    (2100000, "+Inf", 24),
    (2400000, "+Inf", 27),
    (2700000, "+Inf", 30);

-- Want results exactly in the middle of the bucket.
tql eval (420, 420, '1s') histogram_quantile(0.166, histogram2_bucket);

tql eval (420, 420, '1s') histogram_quantile(0.5, histogram2_bucket);

tql eval (420, 420, '1s') histogram_quantile(0.833, histogram2_bucket);

tql eval (2820, 2820, '1s') histogram_quantile(0.166, rate(histogram2_bucket[15m]));

tql eval (2820, 2820, '1s') histogram_quantile(0.5, rate(histogram2_bucket[15m]));

tql eval (2820, 2820, '1s') histogram_quantile(0.833, rate(histogram2_bucket[15m]));

drop table histogram2_bucket;
