import { getSearchResults } from "@/api/hn";
import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import SearchItem from "@/components/SearchItem";
import { useFetch } from "@/hooks/useFetch";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Index = () => {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<SearchFilters>({
    query: "",
    sort: "popularity",
    tag: "front_page",
    timeRange: "all",
    page: 0,
  });
  const [filterVisible, setFilterVisible] = useState(false);

  const { data, loading, error, refetch } = useFetch(() =>
    getSearchResults(filter)
  );

  type ChipItem =
    | {
        type: "tag";
        label: string;
        value: SearchFilters["tag"];
      }
    | {
        type: "sort";
        label: string;
        value: SearchFilters["sort"];
      }
    | {
        type: "button";
        label: string;
        icon?: keyof typeof Ionicons.glyphMap;
        onPress: () => void;
      };

  const ChipListItem = (item: ChipItem) => {
    if (item.type === "tag") {
      return (
        <Chip
          label={item.label}
          active={filter.tag === item.value}
          onPress={() =>
            filter.tag !== item.value &&
            setFilter((f) => ({ ...f, tag: item.value, page: 0 }))
          }
        ></Chip>
      );
    } else if (item.type === "sort") {
      return (
        <Chip
          label={item.label}
          active={filter.sort === item.value}
          onPress={() =>
            filter.sort !== item.value &&
            setFilter((f) => ({ ...f, sort: item.value, page: 0 }))
          }
        ></Chip>
      );
    }
    return (
      <Chip
        label={item.label}
        active={filterVisible}
        icon={item.icon}
        onPress={item.onPress}
      />
    );
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setFilterVisible(true);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) setFilterVisible(false);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const topChips: ChipItem[] = [
    {
      type: "button",
      label: "Filter",
      icon: "filter",
      onPress: handlePresentModalPress,
    },
    { type: "tag", label: "Front Page", value: "front_page" },
    { type: "tag", label: "All", value: "" },
    { type: "tag", label: "Stories", value: "story" },
    { type: "tag", label: "Comments", value: "comment" },
    { type: "tag", label: "Ask HN", value: "ask_hn" },
    { type: "tag", label: "Show HN", value: "show_hn" },
    { type: "tag", label: "Launch HN", value: "launch_hn" },
    { type: "tag", label: "Jobs", value: "job" },
    { type: "tag", label: "Polls", value: "poll" },
  ];

  const sortChips: ChipItem[] = [
    { type: "sort", label: "Popularity", value: "popularity" },
    { type: "sort", label: "Date", value: "date" },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await refetch();
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [filter]);

  return (
    <View className="bg-primary flex-1 px-8">
      <View>
        <SearchBar
          query={filter.query}
          onChangeText={(q) => setFilter((f) => ({ ...f, query: q }))}
        />
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topChips}
          renderItem={({ item }) => ChipListItem(item)}
        />
      </View>
      {loading ? (
        <View className="flex-1 gap-y-4 items-center justify-center">
          <ActivityIndicator color={"#b2b2b2"} />
          <Text className="text-accent font-text-semibold">
            Fetching search results...
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 gap-y-4 items-center justify-center ">
          <AntDesign
            name="reload"
            size={20}
            color="#b2b2b2"
            onPress={refetch}
          />
          <Text className="text-accent font-text-semibold">
            Error: {error.message}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data?.hits}
          renderItem={({ item }) => <SearchItem item={item}></SearchItem>}
          ListFooterComponent={
            <View
              className="flex-row gap-x-2 my-3 items-center justify-center"
              style={{ paddingBottom: insets.bottom }}
            >
              {data && (
                <>
                  <Entypo
                    name="chevron-left"
                    size={16}
                    color={`${filter.page > 0 ? "#b2b2b2" : "#525252"}`}
                    onPress={() =>
                      filter.page > 0 &&
                      setFilter((f) => ({ ...f, page: f.page - 1 }))
                    }
                  />
                  <Text className="text-accent font-text-bold text-sm">
                    Page {filter.page}
                  </Text>
                  <Entypo
                    name="chevron-right"
                    size={16}
                    color={`${filter.page < data?.nbPages - 1 ? "#b2b2b2" : "#525252"}`}
                    onPress={() =>
                      filter.page < data?.nbPages - 1 &&
                      setFilter((f) => ({ ...f, page: f.page + 1 }))
                    }
                  />
                </>
              )}
            </View>
          }
          ListEmptyComponent={
            <View className="flex items-center justify-center">
              {filter.query && (
                <Text className="text-accent text-sm mt-3 font-text-bold">
                  We found no items matching "{filter.query}"
                </Text>
              )}
            </View>
          }
          className="mt-3"
        ></FlatList>
      )}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backgroundStyle={{ backgroundColor: "black" }}
          handleIndicatorStyle={{ backgroundColor: "#b2b2b2" }}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
        >
          <BottomSheetView
            className="flex-1 px-8"
            style={{ paddingBottom: insets.bottom }}
          >
            <View className="flex-row items-center gap-x-2 pb-3">
              <Text className="text-accent font-text-semibold">Sort by: </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={sortChips}
                renderItem={({ item }) => ChipListItem(item)}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Index;
